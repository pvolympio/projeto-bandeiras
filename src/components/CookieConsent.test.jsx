import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import CookieConsent from './CookieConsent'

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear()
    document.getElementById('adsense-script')?.remove()
  })

  it('mantém anúncios bloqueados quando a pessoa escolhe só o necessário', async () => {
    render(<CookieConsent />)
    await userEvent.click(screen.getByRole('button', { name: 'Só o necessário' }))

    expect(document.getElementById('adsense-script')).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('cookieConsentV2'))).toEqual(
      expect.objectContaining({ necessary: true, optional: false }),
    )
  })

  it('carrega o AdSense somente depois da permissão', async () => {
    render(<CookieConsent />)
    await userEvent.click(screen.getByRole('button', { name: 'Permitir anúncios' }))

    expect(document.getElementById('adsense-script')).toHaveAttribute(
      'src',
      expect.stringContaining('pagead2.googlesyndication.com'),
    )
  })
})
