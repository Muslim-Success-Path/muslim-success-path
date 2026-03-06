'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const episodes = [
  { icon: '🌙', title: 'Faith in Daily Life', desc: 'Practical reflections on weaving taqwa into every corner of your day — from morning routines to work and family.', tags: ['Daily Life', 'Taqwa', 'Practical'] },
  { icon: '🔄', title: 'The Revert Experience', desc: 'Honest conversations about what it means to embrace Islam — the beauty, the challenges, and the growth.', tags: ['Reverts', 'Personal', 'Community'] },
  { icon: '💼', title: 'Halal Hustle', desc: 'Building a purposeful career and business as a Muslim — success that aligns with your values.', tags: ['Business', 'Career', 'Halal'] },
  { icon: '🤲', title: 'Lessons from the Quran', desc: 'Deep dives into Quranic stories and ayat — extracting timeless wisdom for modern Muslim life.', tags: ['Quran', 'Tafsir', 'Wisdom'] },
  { icon: '🌸', title: 'Muslim Women Today', desc: 'Conversations celebrating Muslim women — faith, identity, motherhood, and making an impact.', tags: ['Women', 'Identity', 'Empowerment'] },
  { icon: '⭐', title: 'Ramadan Series', desc: 'A special annual series to deepen your Ramadan experience — spiritually, mentally, and physically.', tags: ['Ramadan', 'Seasonal', 'Worship'] },
]

export default function PodcastsPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Faith · Reflection · Real Conversations</div>
          <h1>
            Listen &amp;<br />
            <span className="gold">Reflect</span>
          </h1>
          <p className="hero-sub">
            A podcast for Muslims navigating faith, identity, and intentional living — one conversation at a time.
          </p>
          <div className="hero-actions">
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-gold">Listen Now →</a>
            <Link href="/videos" className="btn-outline">Watch on YouTube</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">Episode Themes</div>
            <h2 className="s-title">Topics We<br />Cover</h2>
            <p className="s-sub">Real conversations about faith, life, and growth — no fluff, just intention.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {episodes.map((e) => (
              <div className="pillar" key={e.title}>
                <span className="pillar-icon">{e.icon}</span>
                <div className="pillar-title">{e.title}</div>
                <p className="pillar-desc">{e.desc}</p>
                <div className="pillar-tags">{e.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter" style={{ position: 'relative', overflow: 'hidden' }}>
        <RippleCanvas intensity={0.45} />
        <div className="nl-glow" />
        <div className="nl-box reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="nl-icon">🎙️</span>
          <h2 className="nl-title">Start Listening</h2>
          <p className="nl-sub">Available on YouTube and major podcast platforms — subscribe so you never miss an episode.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-gold">YouTube →</a>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
