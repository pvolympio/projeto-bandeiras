import { useEffect, useState } from 'react'
import { Cookie, ShieldCheck } from 'lucide-react'
import { Link } from 'wouter'

const CONSENT_KEY = 'cookieConsentV2'
const ADSENSE_ID = 'adsense-script'

function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')
  } catch {
    return null
  }
}

function loadAdsense() {
  if (document.getElementById(ADSENSE_ID)) return

  const script = document.createElement('script')
  script.id = ADSENSE_ID
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8826089907867789'
  document.head.appendChild(script)
}

function CookieConsent() {
  const [consent, setConsent] = useState(readConsent)

  useEffect(() => {
    if (consent?.optional === true) loadAdsense()
  }, [consent])

  const saveConsent = (optional) => {
    const decision = {
      necessary: true,
      optional,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(decision))
    setConsent(decision)
  }

  if (consent) return null

  return (
    <aside className="consent-card" aria-label="Preferências de privacidade">
      <div className="consent-card__icon"><Cookie aria-hidden="true" /></div>
      <div className="consent-card__copy">
        <strong>Você escolhe o que fica ativo.</strong>
        <p>
          O progresso e o tema usam apenas armazenamento necessário neste dispositivo.
          Anúncios só serão carregados com sua permissão. <Link href="/politica-privacidade">Saiba mais</Link>.
        </p>
      </div>
      <div className="consent-card__actions">
        <button type="button" className="consent-button consent-button--quiet" onClick={() => saveConsent(false)}>
          Só o necessário
        </button>
        <button type="button" className="consent-button consent-button--accept" onClick={() => saveConsent(true)}>
          <ShieldCheck aria-hidden="true" /> Permitir anúncios
        </button>
      </div>
    </aside>
  )
}

export default CookieConsent
