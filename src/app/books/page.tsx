'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const books = [
  { icon: '📗', title: 'Becoming Muslim As A Revert', desc: 'A compassionate, comprehensive guide for those who have just embraced Islam — covering the essentials with warmth and clarity. Available on Wattpad and in our store.', tags: ['Reverts', 'New Muslims', 'Essential'] },
  { icon: '🌸', title: 'Faith & Identity', desc: 'Navigating life as a Muslim in the modern world — building a strong identity grounded in your deen.', tags: ['Identity', 'Modern Muslim', 'Confidence'] },
  { icon: '🤲', title: 'Muslim Prayer Basics', desc: 'A clear, step-by-step guide to salah for Muslims of all ages and backgrounds — from wudu to the meaning behind every movement.', tags: ['Salah', 'All Ages', 'Guide'] },
  { icon: '🌙', title: 'Ramadan Companion', desc: 'A month-by-month and day-by-day companion to make every Ramadan your most impactful yet.', tags: ['Ramadan', 'Worship', 'Reflection'] },
  { icon: '💛', title: 'Islamic Mindset', desc: 'Reframe your thinking with Islamic principles — productivity, gratitude, patience, and tawakkul.', tags: ['Mindset', 'Growth', 'Tawakkul'] },
  { icon: '👩‍👧', title: 'Muslim Family Life', desc: 'Building a home rooted in Islam — for new parents, couples, and those raising Muslim children.', tags: ['Family', 'Parenting', 'Home'] },
]

const platforms = [
  { icon: '📕', name: 'Wattpad',   href: 'https://www.wattpad.com/user/muslimsuccesspath',             desc: 'Read our stories and guides free on Wattpad',              link: 'Read →' },
  { icon: '🛒', name: 'Store',     href: 'https://www.effortlessworks.store/',                         desc: 'Purchase digital books and guides in our online store',    link: 'Shop →' },
  { icon: '💼', name: 'LinkedIn',  href: 'https://www.linkedin.com/company/muslim-success-path/about', desc: 'Follow our professional updates and announcements',        link: 'Follow →' },
  { icon: '📸', name: 'Instagram', href: 'https://www.instagram.com/muslim.success.path',              desc: 'New books and behind-the-scenes on Instagram',             link: 'Follow →' },
]

export default function BooksPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Written for Every Muslim</div>
          <h1>
            Books That<br />
            <span className="gold">Transform</span>
          </h1>
          <p className="hero-sub">
            Written from lived experience and deep reflection — books for new Muslims, lifelong learners, and everyone growing in their deen.
          </p>
          <div className="hero-actions">
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="btn-gold">Shop Books →</a>
            <Link href="/courses" className="btn-outline">Explore Courses</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Our Books</div>
            <h2 className="s-title">Read, Reflect,<br />Grow</h2>
            <p className="s-sub">Each book is crafted to meet you where you are and guide you forward.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {books.map((b) => (
              <div className="pillar" key={b.title}>
                <span className="pillar-icon">{b.icon}</span>
                <div className="pillar-title">{b.title}</div>
                <p className="pillar-desc">{b.desc}</p>
                <div className="pillar-tags">{b.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Find */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderTop: '1px solid var(--border-dim)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Find Our Books</div>
            <h2 className="s-title">Where to Read</h2>
            <p className="s-sub">Browse our books and guides across these platforms — some are free, some available in our store.</p>
          </div>
          <div className="res-grid reveal" style={{ marginTop: 40 }}>
            {platforms.map(l => (
              <a href={l.href} className="res-card" key={l.name} target="_blank" rel="noopener noreferrer">
                <span className="res-icon">{l.icon}</span>
                <div className="res-name">{l.name}</div>
                <div className="res-desc">{l.desc}</div>
                <div className="res-link">{l.link}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">📚</span>
          <h2 className="nl-title">Start Reading</h2>
          <p className="nl-sub">Browse the full collection and find the book that meets you on your journey.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer" className="btn-gold">Shop Now →</a>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
