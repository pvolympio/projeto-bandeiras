import { Radio } from 'lucide-react'
import { Link } from 'wouter'

const footerLinks = [
  { href: '/sobre', label: 'Sobre o projeto' },
  { href: '/contato', label: 'Contato' },
  { href: '/politica-privacidade', label: 'Privacidade' },
  { href: '/termos-de-uso', label: 'Termos de uso' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Radio aria-hidden="true" />
          <div>
            <strong>Bandeiras do Mundo</strong>
            <p>O planeta fala em cores. Aprenda a ler cada sinal.</p>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Links institucionais">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <p className="site-footer__note">
          © {new Date().getFullYear()} · 193 sinais, um só mundo.
        </p>
      </div>
    </footer>
  )
}

export default Footer
