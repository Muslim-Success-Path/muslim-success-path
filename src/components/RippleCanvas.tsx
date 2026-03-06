'use client'
import { useEffect, useRef } from 'react'

interface RGBColor { r: number; g: number; b: number }

const RIPPLE_COLS: RGBColor[] = [
  { r:245, g:200, b: 66 },
  { r:200, g:140, b:255 },
  { r:255, g:130, b:200 },
  { r: 80, g:230, b:210 },
  { r:130, g:180, b:255 },
  { r:255, g:160, b:100 },
  { r:180, g:255, b:160 },
  { r:255, g:100, b:180 },
  { r: 80, g:200, b:255 },
  { r:255, g:220, b:100 },
  { r:200, g:150, b:255 },
  { r:100, g:255, b:200 },
]

interface Props {
  /** 1 = hero (full intensity), 0.45 = soft sections */
  intensity?: number
}

export default function RippleCanvas({ intensity = 0.45 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const CELL = 8  // was 4 — 4x fewer grid cells, huge CPU saving
    let W = 0, H = 0, cols = 0, rows = 0
    let cur: Float32Array, prev: Float32Array
    let rafId = 0, tick = 0, autoTimer = 0
    let lastRipple = 0, lastFrame = 0
    const FPS = 38

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      W = canvas.width  = rect.width
      H = canvas.height = rect.height
      cols = Math.floor(W / CELL) + 2
      rows = Math.floor(H / CELL) + 2
      cur  = new Float32Array(cols * rows)
      prev = new Float32Array(cols * rows)
    }

    // Wait a tick so the parent has its final size
    const initTimer = setTimeout(() => {
      resize()
      window.addEventListener('resize', resize)
      startLoop()
    }, 50)

    const idx = (x: number, y: number) => y * cols + x

    const drop = (gx: number, gy: number, strength: number) => {
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 3.5) {
            const xi = gx + dx, yi = gy + dy
            if (xi > 0 && xi < cols-1 && yi > 0 && yi < rows-1) {
              prev[idx(xi, yi)] += strength * (1 - d / 3.5)
            }
          }
        }
      }
    }

    // ── Glimmer ──
    class Glimmer {
      x = 0; y = 0; vx = 0; vy = 0; r = 1
      life = 0; maxLife = 200; col: RGBColor = RIPPLE_COLS[0]; pulse = 0; pulseSpeed = .03

      constructor() { this.reset(true) }

      reset(init: boolean) {
        this.x = Math.random() * W
        this.y = init ? Math.random() * H : (Math.random() < .5 ? 0 : H)
        this.vx = (Math.random() - .5) * .4
        this.vy = (Math.random() - .5) * .4
        this.r  = .5 + Math.random() * 2.5
        this.life = 0
        this.maxLife = 180 + Math.random() * 300
        this.col = RIPPLE_COLS[Math.floor(Math.random() * RIPPLE_COLS.length)]
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = .02 + Math.random() * .04
      }

      update() {
        this.x += this.vx; this.y += this.vy; this.life++
        this.pulse += this.pulseSpeed
        this.vx += (Math.random() - .5) * .06; this.vx *= .98
        this.vy += (Math.random() - .5) * .06; this.vy *= .98
        if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
          this.reset(false)
        }
      }

      draw() {
        const progress = this.life / this.maxLife
        const fade = progress < .15 ? progress / .15 : progress > .75 ? 1 - (progress - .75) / .25 : 1
        const alpha = fade * (.7 + .3 * Math.sin(this.pulse)) * .85 * intensity
        const radius = Math.max(0.1, this.r * (1 + .3 * Math.sin(this.pulse)))
        const outer  = Math.max(radius + 0.1, radius * 4)
        if (!isFinite(this.x) || !isFinite(this.y) || !isFinite(radius)) return
        const { r, g, b } = this.col
        const grd = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, outer)
        grd.addColorStop(0,  `rgba(${r},${g},${b},${alpha})`)
        grd.addColorStop(.3, `rgba(${r},${g},${b},${alpha * .6})`)
        grd.addColorStop(1,  `rgba(${r},${g},${b},0)`)
        ctx!.beginPath(); ctx!.arc(this.x, this.y, outer, 0, Math.PI * 2)
        ctx!.fillStyle = grd; ctx!.fill()
        if (intensity > 0.3) {
          ctx!.beginPath(); ctx!.arc(this.x, this.y, radius, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(255,255,255,${alpha * .9})`; ctx!.fill()
        }
      }
    }

    // ── RippleRing ──
    class Ring {
      x: number; y: number; radius = 0
      maxRadius: number; speed: number; col: RGBColor; lineWidth: number

      constructor(x: number, y: number) {
        this.x = x; this.y = y
        this.maxRadius = 120 + Math.random() * 180
        this.speed = .8 + Math.random() * 1.2
        this.col = RIPPLE_COLS[Math.floor(Math.random() * RIPPLE_COLS.length)]
        this.lineWidth = 1 + Math.random() * 1.5
      }
      update() { this.radius += this.speed }
      get dead() { return this.radius >= this.maxRadius }
      draw() {
        if (!isFinite(this.x) || !isFinite(this.y) || this.radius <= 0) return
        const prog  = this.radius / this.maxRadius
        const alpha = (1 - prog) * (1 - prog) * .25 * intensity
        const { r, g, b } = this.col
        ctx!.beginPath(); ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`
        ctx!.lineWidth = this.lineWidth * (1 - prog * .5); ctx!.stroke()
        if (this.radius > 10) {
          ctx!.beginPath(); ctx!.arc(this.x, this.y, this.radius * .6, 0, Math.PI * 2)
          ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha * .4})`
          ctx!.lineWidth = .5; ctx!.stroke()
        }
      }
    }

    const glimmerCount = intensity >= 1 ? 40 : 20
    const glimmers: Glimmer[] = []
    const rings: Ring[] = []

    // Mouse ripples — relative to canvas position in page
    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const throttle = intensity >= 1 ? 80 : 140
      if (now - lastRipple < throttle) return
      lastRipple = now
      const rect = canvas.getBoundingClientRect()
      // Convert mouse position to canvas-local coords
      const lx = e.clientX - rect.left
      const ly = e.clientY - rect.top
      if (lx < 0 || lx > W || ly < 0 || ly > H) return
      rings.push(new Ring(lx, ly))
      drop(Math.floor(lx / CELL), Math.floor(ly / CELL), (80 + Math.random() * 60) * intensity)
    }

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const lx = e.clientX - rect.left
      const ly = e.clientY - rect.top
      if (lx < 0 || lx > W || ly < 0 || ly > H) return
      const count = intensity >= 1 ? 5 : 3
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const ring = new Ring(lx, ly)
          ring.maxRadius = 80 + i * 60
          ring.col = RIPPLE_COLS[Math.floor(Math.random() * RIPPLE_COLS.length)]
          rings.push(ring)
        }, i * 60)
      }
      drop(Math.floor(lx / CELL), Math.floor(ly / CELL), 200 * intensity)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)

    const stepGrid = () => {
      const damp = .97
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = idx(x, y)
          cur[i] = (prev[idx(x-1,y)] + prev[idx(x+1,y)] + prev[idx(x,y-1)] + prev[idx(x,y+1)]) * .5 - cur[i]
          cur[i] *= damp
        }
      }
      const tmp = prev; prev = cur; cur = tmp
    }

    const startLoop = () => {
      // Spawn glimmers after grid is ready
      for (let i = 0; i < glimmerCount; i++) glimmers.push(new Glimmer())

      const loop = (ts: number) => {
        try {
          if (ts - lastFrame < 1000 / FPS) { rafId = requestAnimationFrame(loop); return }
          lastFrame = ts
          tick++; autoTimer++
          ctx!.clearRect(0, 0, W, H)

          // Auto-drop random ripples
          const interval = intensity >= 1 ? 40 : 60
          if (autoTimer % interval === 0) {
            const x = Math.random() * W, y = Math.random() * H
            rings.push(new Ring(x, y))
            drop(Math.floor(x / CELL), Math.floor(y / CELL), (60 + Math.random() * 80) * intensity)
          }

          stepGrid()

          // Draw grid color patches
          const base = intensity >= 1 ? .18 : .08
          for (let y = 0; y < rows - 1; y++) {
            for (let x = 0; x < cols - 1; x++) {
              const h = cur[idx(x, y)]
              if (Math.abs(h) > 1.5) {
                const ci = Math.floor(tick * .01 + x + y) % RIPPLE_COLS.length
                const c  = RIPPLE_COLS[ci]
                const i2 = Math.min(Math.abs(h) / 60, 1)
                ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},${i2 * base * intensity})`
                ctx!.fillRect(x * CELL, y * CELL, CELL, CELL)
              }
            }
          }

          // Draw rings
          for (let i = rings.length - 1; i >= 0; i--) {
            rings[i].update(); rings[i].draw()
            if (rings[i].dead) rings.splice(i, 1)
          }

          // Draw glimmers
          glimmers.forEach(g => { g.update(); g.draw() })
        } catch (_) { /* skip bad frame */ }
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    }

    return () => {
      clearTimeout(initTimer)
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
