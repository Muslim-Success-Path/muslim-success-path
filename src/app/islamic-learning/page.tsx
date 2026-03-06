'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const resources = [
  { icon: '📖', title: 'Books for New Muslims', desc: 'Accessible, thoughtful books written for reverts and those beginning their Islamic journey.', tags: ['Reverts', 'Beginners', 'Faith'] },
  { icon: '🎙️', title: 'Podcasts', desc: 'Faith reflections, life lessons, and Islamic knowledge — one episode at a time.', tags: ['Audio', 'Weekly', 'Reflection'] },
  { icon: '▶️', title: 'YouTube Series', desc: 'Video lessons covering Quran, seerah, fiqh, and everyday Muslim life.', tags: ['Video', 'YouTube', 'Series'] },
  { icon: '🎓', title: 'Courses', desc: 'Structured learning paths for deep, transformative understanding of Islam.', tags: ['Structured', 'Self-Paced', 'Certificates'] },
  { icon: '📿', title: 'Quran Study Guides', desc: 'Companion guides for Quran study — with context, reflection prompts, and journaling space.', tags: ['Quran', 'Tafsir', 'Study'] },
  { icon: '🌙', title: 'Ramadan Resources', desc: 'Dedicated tools and guides to help you make the most of the blessed month.', tags: ['Ramadan', 'Worship', 'Planning'] },
]

export default function IslamicLearningPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Books · Podcasts · Courses · Quran</div>
          <h1>
            <span className="gold">Knowledge</span> is<br />
            an Act of Worship
          </h1>
          <p className="hero-sub">
            Explore books, podcasts, YouTube series, and courses designed to deepen your understanding of Islam — whether you're a revert, a lifelong Muslim, or somewhere in between.
          </p>
          <div className="hero-actions">
            <Link href="/books" className="btn-gold">Browse Books →</Link>
            <Link href="/courses" className="btn-outline">Explore Courses</Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Learning Resources</div>
            <h2 className="s-title">Every Path to<br />Knowledge</h2>
            <p className="s-sub">Resources for every stage of the journey — from first steps to deepening practice.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {resources.map((r) => (
              <div className="pillar" key={r.title}>
                <span className="pillar-icon">{r.icon}</span>
                <div className="pillar-title">{r.title}</div>
                <p className="pillar-desc">{r.desc}</p>
                <div className="pillar-tags">{r.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Jump To</div>
            <h2 className="s-title">Find What You Need</h2>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 40 }}>
            {[
              { icon: '📖', name: 'Books',   href: '/books' },
              { icon: '🎙️', name: 'Podcasts', href: '/podcasts' },
              { icon: '▶️', name: 'Videos',  href: '/videos' },
              { icon: '🎓', name: 'Courses', href: '/courses' },
            ].map(l => (
              <Link href={l.href} className="res-card" key={l.name}>
                <span className="res-icon">{l.icon}</span>
                <div className="res-name">{l.name}</div>
                <div className="res-link">Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
