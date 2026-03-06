'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

type Status = 'live' | 'in-progress' | 'coming-soon'

const roadmap: { quarter: string; items: { icon: string; title: string; desc: string; status: Status }[] }[] = [
  {
    quarter: 'Now Live',
    items: [
      { icon: '🧶', title: 'Crochet Pattern Library',     desc: 'Islamic crochet patterns with video guides, available on Etsy.',        status: 'live' },
      { icon: '📖', title: 'New Muslim Book',              desc: 'Foundational book for reverts and beginners, available now.',            status: 'live' },
      { icon: '🗂️', title: 'Notion & Sheets Templates',   desc: 'Organizational templates for the intentional Muslim lifestyle.',        status: 'live' },
      { icon: '▶️', title: 'YouTube Channel',              desc: 'Tutorials, reflections, and knowledge — new videos weekly.',            status: 'live' },
    ],
  },
  {
    quarter: 'In Progress',
    items: [
      { icon: '🎓', title: 'Quran Reading Course',         desc: 'A beginner Arabic and tajweed course — structured and self-paced.',     status: 'in-progress' },
      { icon: '💼', title: 'Halal Business Blueprint',     desc: 'A full course on building a halal business with Islamic principles.',   status: 'in-progress' },
      { icon: '🎙️', title: 'Podcast Season 2',             desc: 'New episodes covering faith, productivity, and Muslim identity.',       status: 'in-progress' },
    ],
  },
  {
    quarter: 'Coming Soon',
    items: [
      { icon: '📱', title: 'Prayer Tracker App',           desc: 'A beautiful app for tracking salah streaks and building consistency.',  status: 'coming-soon' },
      { icon: '🌙', title: 'Ramadan Companion App',        desc: 'Your all-in-one Ramadan planning and worship companion.',              status: 'coming-soon' },
      { icon: '📿', title: 'Dhikr Counter App',            desc: 'A clean, distraction-free digital tasbih for daily remembrance.',      status: 'coming-soon' },
      { icon: '🧠', title: 'Islamic Mindset Course',       desc: 'Transform your thinking with Quranic principles and prophetic wisdom.', status: 'coming-soon' },
      { icon: '📖', title: 'Quran Journal Book',           desc: 'A guided journal for your Quran study — reflections, notes, and more.', status: 'coming-soon' },
    ],
  },
]

const statusStyle: Record<Status, { label: string; bg: string; border: string; color: string }> = {
  'live':         { label: 'Live',         bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)',  color: '#34d399' },
  'in-progress':  { label: 'In Progress',  bg: 'rgba(245,200,66,0.1)',  border: 'rgba(245,200,66,0.3)',  color: 'var(--gold)' },
  'coming-soon':  { label: 'Coming Soon',  bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', color: 'var(--purple)' },
}

export default function RoadmapPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ What's Live · In Progress · Coming Next</div>
          <h1>
            The <span className="gold">Roadmap</span>
          </h1>
          <p className="hero-sub">
            A transparent look at everything we're building — what's live today, what's in progress, and what's on the horizon for the Muslim Success Path community.
          </p>
          <div className="hero-actions">
            <Link href="/#newsletter" className="btn-gold">Get Updates →</Link>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      {roadmap.map((phase, pi) => (
        <section
          key={phase.quarter}
          className="section"
          style={{ position: 'relative', overflow: 'hidden', background: pi % 2 === 0 ? 'var(--bg)' : 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}
        >
          <RippleCanvas intensity={0.45} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="reveal">
              <div className="s-tag">{phase.quarter}</div>
            </div>
            <div className="res-grid reveal" style={{ marginTop: 32 }}>
              {phase.items.map((item) => {
                const s = statusStyle[item.status]
                return (
                  <div className="res-card" key={item.title} style={{ cursor: 'default' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="res-icon">{item.icon}</span>
                      <span style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: s.bg, border: `1px solid ${s.border}`, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
                    </div>
                    <div className="res-name">{item.title}</div>
                    <div className="res-desc">{item.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">🗺️</span>
          <h2 className="nl-title">Stay in the Loop</h2>
          <p className="nl-sub">Subscribe to get notified when new products, courses, and apps go live.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/#newsletter" className="btn-gold">Join Newsletter →</Link>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
