import { useEffect, useState } from 'react'
import { Download, Menu, Moon, Radio, Sun, Volume2, VolumeX, X } from 'lucide-react'
import { Link, useLocation } from 'wouter'
import { useDarkMode } from '../hooks/useDarkMode'
import { useSoundSettings } from '../contexts/soundSettings'

const navigation = [
  { href: '/', label: 'Explorar' },
  { href: '/quiz', label: 'Quizzes' },
  { href: '/curiosidades', label: 'Descobrir' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/perfil', label: 'Meu atlas' },
]

function HeaderPrincipal() {
  const [theme, toggleTheme] = useDarkMode()
  const { isMuted, toggleSound } = useSoundSettings()
  const [location] = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setDeferredPrompt(null)
  }

  const isActive = (href) => href === '/'
    ? location === '/'
    : location === href || location.startsWith(`${href}/`)

  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="brand-mark" aria-label="Bandeiras do Mundo — início">
            <span className="brand-mark__signal" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="brand-mark__copy">
              <strong>Bandeiras</strong><small>do mundo</small>
            </span>
          </Link>

          <nav className="primary-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'primary-nav__link is-active' : 'primary-nav__link'}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            {deferredPrompt && (
              <button className="install-button" type="button" onClick={handleInstall}>
                <Download aria-hidden="true" />
                <span>Instalar</span>
              </button>
            )}

            <button
              className="icon-button"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>

            <button
              className="icon-button"
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? 'Ativar sons' : 'Desativar sons'}
              aria-pressed={isMuted}
            >
              {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
            </button>

            <button
              className="icon-button menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel">
            <span className="mobile-nav__coordinate">
              <Radio aria-hidden="true" /> Sinal aberto
            </span>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'mobile-nav__link is-active' : 'mobile-nav__link'}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}

export default HeaderPrincipal
