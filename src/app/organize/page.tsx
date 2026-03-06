'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const tools = [
  { icon: '📋', title: 'Notion Templates', desc: 'Ready-to-use Notion dashboards for daily routines, Islamic goals, Quran tracking, and more.', tags: ['Notion', 'Daily Routine', 'Goals'] },
  { icon: '📊', title: 'Google Sheets', desc: 'Spreadsheet systems for habit tracking, budgeting, and business planning — with an Islamic mindset.', tags: ['Google Sheets', 'Budgeting', 'Habits'] },
  { icon: '🕌', title: 'Prayer Planner', desc: 'Plan your day around your five daily prayers — the foundation of a structured Muslim life.', tags: ['Salah', 'Daily Planner', 'Routine'] },
  { icon: '📅', title: 'Ramadan Planner', desc: 'A full Ramadan planning system covering worship goals, meal planning, and reflection journals.', tags: ['Ramadan', 'Worship', 'Planning'] },
  { icon: '💼', title: 'Business Tools', desc: 'Halal business planning templates — from idea validation to launch and growth tracking.', tags: ['Business', 'Halal Income', 'Launch'] },
  { icon: '🎯', title: 'Goal Tracking', desc: 'Long-term goal systems built on Islamic values — tracking dunya and akhirah goals together.', tags: ['Goals', 'Akhirah', 'Mindset'] },
]

export default function OrganizePage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Notion · Sheets · Planners · Systems</div>
          <h1>
            An Intentional<br />
            <span className="gold">Muslim Life</span>
          </h1>
          <p className="hero-sub">
            Organization tools built around Islamic values — because when your time is structured with intention, your deen and dunya thrive together.
          </p>
          <div className="hero-actions">
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="btn-gold">Browse Templates →</a>
            <Link href="/roadmap" className="btn-outline">View Roadmap</Link>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Tools &amp; Templates</div>
            <h2 className="s-title">Systems for<br />Every Muslim</h2>
            <p className="s-sub">Everything you need to bring order, clarity, and barakah to your daily life.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {tools.map((t) => (
              <div className="pillar" key={t.title}>
                <span className="pillar-icon">{t.icon}</span>
                <div className="pillar-title">{t.title}</div>
                <p className="pillar-desc">{t.desc}</p>
                <div className="pillar-tags">{t.tags.map(tag => <span className="ptag" key={tag}>{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">🗂️</span>
          <h2 className="nl-title">Get Organized</h2>
          <p className="nl-sub">Browse the full template library at Effortless Works — built for the intentional Muslim.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="btn-gold">Visit the Store →</a>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
