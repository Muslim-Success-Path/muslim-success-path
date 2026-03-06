'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="nav-logo" style={{ display: 'inline-flex' }}>
            <span className="star">✦</span> Muslim Success Path
          </Link>
          <p>Faith-centered resources for learning, creating, and living with intention — every step of the way.</p>
          <div className="socials">
            {[
              { href: 'https://www.instagram.com/muslim.success.path', label: '📸' },
              { href: 'https://www.tiktok.com/@muslim.success.path',   label: '🎵' },
              { href: 'https://www.youtube.com/@MuslimSuccessPath',    label: '▶️' },
              { href: 'https://www.linkedin.com/company/muslim-success-path/about', label: '💼' },
              { href: 'https://x.com/muslimsuccess_', label: '✖️' },
            ].map(s => (
              <a href={s.href} key={s.href} className="social-btn" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/crocheting">Crocheting</Link>
          <Link href="/islamic-learning">Islamic Resources</Link>
          <Link href="/organize">Organization</Link>
          <Link href="/roadmap">Roadmap</Link>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <Link href="/books">Books</Link>
          <Link href="/podcasts">Podcasts</Link>
          <Link href="/videos">Videos</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/apps">Apps</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/#newsletter">Newsletter</Link>
          <a href="https://www.effortlessworks.store/" target="_blank" rel="noopener noreferrer">Effortless Works</a>
          <a href="https://www.etsy.com/shop/EffortlessWorks" target="_blank" rel="noopener noreferrer">Etsy Shop</a>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Muslim Success Path · Effortless Works. All rights reserved.</span>
        <div className="footer-legal">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
