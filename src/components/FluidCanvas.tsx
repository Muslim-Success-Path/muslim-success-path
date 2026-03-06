'use client'
import { useEffect, useRef } from 'react'

interface OrbColor { r: number; g: number; b: number; a: number }
interface Orb {
  x: number; y: number; tx: number; ty: number
  r: number; vx: number; vy: number
  pull: number; lag: number; col: OrbColor
}

const PALETTE: OrbColor[] = [
  { r:245, g:200, b: 66, a:.18 },
  { r:139, g: 92, b:246, a:.15 },
  { r:244, g:114, b:182, a:.14 },
  { r: 45, g:212, b:191, a:.13 },
  { r:200, g:140, b: 20, a:.14 },
  { r:167, g:139, b:250, a:.11 },
  { r: 59, g:130, b:246, a:.11 },
  // 3 small bright accents
  { r:245, g:200, b: 66, a:.22 },
  { r:139, g: 92, b:246, a:.20 },
  { r: 45, g:212, b:191, a:.18 },
]

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, rafId = 0
    let fmx = 700, fmy = 400

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const orbs: Orb[] = PALETTE.map((col, i) => ({
      x: Math.random() * 1400, y: Math.random() * 900,
      tx: Math.random() * 1400, ty: Math.random() * 900,
      r: i < 7 ? 180 + Math.random() * 180 : 60 + Math.random() * 80,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      pull: i < 7 ? 0.006 + i * 0.002 : 0.025 + Math.random() * .01,
      lag:  i < 7 ? 0.025 + i * 0.006 : 0.07  + Math.random() * .02,
      col,
    }))

    let lastFrame = 0
    const FPS = 40 // cap at 40fps — looks smooth, saves ~35% CPU vs 60fps

    const onMouseMove = (e: MouseEvent) => {
      fmx = e.clientX
      fmy = e.clientY + window.scrollY
    }
    const onScroll = () => { fmy = window.innerHeight * .4 + window.scrollY }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    let paused = false
    const onVisChange = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisChange)

    const loop = (ts: number) => {
      rafId = requestAnimationFrame(loop)
      if (paused || ts - lastFrame < 1000 / FPS) return
      lastFrame = ts
      ctx.clearRect(0, 0, W, H)
      for (const o of orbs) {
        const vmx = fmx, vmy = fmy - window.scrollY
        o.tx += (vmx - o.tx) * o.pull
        o.ty += (vmy - o.ty) * o.pull
        o.x  += (o.tx - o.x) * o.lag + o.vx
        o.y  += (o.ty - o.y) * o.lag + o.vy
        o.vx += (Math.random() - .5) * .07; o.vx *= .97
        o.vy += (Math.random() - .5) * .07; o.vy *= .97

        if (!isFinite(o.x) || !isFinite(o.y)) { o.x = Math.random() * W; o.y = Math.random() * H }
        if (!isFinite(o.vx)) o.vx = 0
        if (!isFinite(o.vy)) o.vy = 0
        const r = Math.max(1, o.r)

        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r)
        g.addColorStop(0,   `rgba(${o.col.r},${o.col.g},${o.col.b},${o.col.a})`)
        g.addColorStop(.55, `rgba(${o.col.r},${o.col.g},${o.col.b},${o.col.a * .35})`)
        g.addColorStop(1,   `rgba(${o.col.r},${o.col.g},${o.col.b},0)`)
        ctx.beginPath()
        ctx.arc(o.x, o.y, r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="fluid-canvas" />
}
