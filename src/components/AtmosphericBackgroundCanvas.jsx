import React, { useEffect, useRef } from 'react'

export default function AtmosphericBackgroundCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Partículas luminosas do atlas
    const particleCount = Math.floor(Math.min(width, height) / 25)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }))

    let mouseX = width / 2
    let mouseY = height / 2

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    let wavePhase = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Grade Cartográfica Holográfica Sutil
      ctx.strokeStyle = 'rgba(14, 116, 144, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 48
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // 2. Onda Atmosférica de Luz (Aurora)
      wavePhase += 0.008
      const gradient = ctx.createLinearGradient(
        Math.sin(wavePhase) * 200,
        0,
        width,
        height
      )
      gradient.addColorStop(0, 'rgba(14, 116, 144, 0.025)')
      gradient.addColorStop(0.5, 'rgba(242, 181, 68, 0.02)')
      gradient.addColorStop(1, 'rgba(11, 59, 91, 0.03)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // 3. Reação suave ao cursor (Glow do sinal)
      const mouseGlow = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        280
      )
      mouseGlow.addColorStop(0, 'rgba(242, 181, 68, 0.04)')
      mouseGlow.addColorStop(0.5, 'rgba(14, 116, 144, 0.02)')
      mouseGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = mouseGlow
      ctx.fillRect(0, 0, width, height)

      // 4. Partículas Bioluminescentes
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha += Math.sin(wavePhase * 2) * p.pulseSpeed * 0.5

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.save()
        ctx.globalAlpha = Math.max(0.1, Math.min(0.7, p.alpha))
        ctx.fillStyle = '#f2b544'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  )
}
