'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RippleCanvas from '@/components/RippleCanvas'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FluidCanvas = dynamic(() => import('@/components/FluidCanvas'), { ssr: false })
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false })

const patterns = [
  { icon: '🧕', title: 'Hijab Patterns', desc: 'Beautiful, modest crochet hijab designs for every occasion — from daily wear to special events.', tags: ['Beginner', 'Intermediate', 'Advanced'] },
  { icon: '🤲', title: 'Prayer Accessories', desc: 'Crochet prayer mats, tasbih pouches, and Quran covers crafted with care and intention.', tags: ['Prayer Mat', 'Tasbih Pouch', 'Quran Cover'] },
  { icon: '👗', title: 'Islamic Clothing', desc: 'Modest crochet clothing patterns including abayas, cardigans, and layering pieces.', tags: ['Abaya', 'Cardigan', 'Modest Wear'] },
  { icon: '🎁', title: 'Gifts & Decor', desc: 'Islamic home decor and gift items — wall hangings, bookmarks, and special occasion pieces.', tags: ['Home Decor', 'Gifts', 'Eid'] },
  { icon: '📹', title: 'Video Guides', desc: 'Step-by-step video walkthroughs for every pattern, designed for all skill levels.', tags: ['YouTube', 'Tutorials', 'All Levels'] },
  { icon: '🛒', title: 'Etsy Shop', desc: 'Browse and purchase finished handmade pieces directly from our Etsy shop.', tags: ['Handmade', 'Shop', 'Custom Orders'] },
]

export default function CrochetingPage() {
  return (
    <>
      <FluidCanvas />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', alignItems: 'center' }}>
        <RippleCanvas intensity={1} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">✦ Handmade · Modest · Intentional</div>
          <h1>
            Crochet with<br />
            <span className="gold">Purpose</span>
          </h1>
          <p className="hero-sub">
            Every stitch is an act of intention. Explore Islamic crochet patterns, video guides, and handmade pieces crafted for the modest Muslim lifestyle.
          </p>
          <div className="hero-actions">
            <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer" className="btn-gold">Shop on Etsy →</a>
            <a href="https://www.youtube.com/@MuslimSuccessPath" target="_blank" rel="noopener noreferrer" className="btn-outline">Watch Tutorials</a>
          </div>
        </div>
      </section>

      {/* Patterns Grid */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <RippleCanvas intensity={0.45} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal">
            <div className="s-tag">What We Offer</div>
            <h2 className="s-title">Patterns &amp; Pieces</h2>
            <p className="s-sub">From beginner-friendly hijab patterns to intricate prayer accessories — everything made with care.</p>
          </div>
          <div className="pillars-grid reveal" style={{ marginTop: 52 }}>
            {patterns.map((p, i) => (
              <div className="pillar" key={p.title} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="pillar-icon">{p.icon}</span>
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-tags">{p.tags.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
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
          <span className="nl-icon">🧶</span>
          <h2 className="nl-title">Start Crocheting</h2>
          <p className="nl-sub">Browse the full pattern library and handmade shop — new designs added regularly.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer" className="btn-gold">Visit Etsy Shop →</a>
            <Link href="/" className="btn-outline">← Back Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
