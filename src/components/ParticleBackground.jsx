import { useRef, useEffect } from 'react'

class NebulaCloud {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }
  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.radius = Math.random() * 200 + 200
    this.vx = (Math.random() - 0.5) * 0.15
    this.vy = (Math.random() - 0.5) * 0.15
    this.color = Math.random() > 0.6 
      ? 'rgba(212, 175, 55, 0.02)'  // Gold
      : 'rgba(88, 24, 26, 0.04)'    // Maroon
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x < -this.radius || this.x > this.canvas.width + this.radius) this.vx *= -1
    if (this.y < -this.radius || this.y > this.canvas.height + this.radius) this.vy *= -1
  }
  draw(ctx) {
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
    grad.addColorStop(0, this.color)
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

class SpiritualSymbol {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
    this.opacity = Math.random() * 0.5
    this.fadeDirection = Math.random() > 0.5 ? 1 : -1
  }
  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 18 + 14
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
    this.angle = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.008
    const symbols = ['ॐ', '卐', '✦', '🕉️']
    this.char = symbols[Math.floor(Math.random() * symbols.length)]
    this.opacity = 0.01
    this.fadeDirection = 1
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.angle += this.rotationSpeed

    this.opacity += 0.004 * this.fadeDirection
    if (this.opacity >= 0.55) {
      this.opacity = 0.55
      this.fadeDirection = -1
    } else if (this.opacity <= 0) {
      this.reset()
    }

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.font = `${this.size}px "Cinzel Decorative", serif`
    
    ctx.shadowColor = 'rgba(212, 175, 55, 0.3)'
    ctx.shadowBlur = 6
    
    const grad = ctx.createLinearGradient(-this.size/2, -this.size/2, this.size/2, this.size/2)
    grad.addColorStop(0, `rgba(255, 215, 0, ${this.opacity})`)
    grad.addColorStop(0.5, `rgba(212, 175, 55, ${this.opacity})`)
    grad.addColorStop(1, `rgba(241, 196, 15, ${this.opacity * 0.7})`)
    
    ctx.fillStyle = grad
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.char, 0, 0)
    ctx.restore()
  }
}

class SparkleParticle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }
  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 2 + 0.5
    this.vx = (Math.random() - 0.5) * 0.2
    this.vy = (Math.random() - 0.5) * 0.2
    this.pulse = Math.random() * Math.PI
    this.pulseSpeed = 0.015 + Math.random() * 0.02
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.pulse += this.pulseSpeed
    
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1
  }
  draw(ctx) {
    const alpha = (Math.sin(this.pulse) + 1) / 2 * 0.5 + 0.1
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`
    ctx.shadowColor = 'rgba(212, 175, 55, 0.5)'
    ctx.shadowBlur = 4
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const clouds = []
    const symbols = []
    const sparkles = []

    const CLOUD_COUNT = 8
    const SYMBOL_COUNT = 15
    const SPARKLE_COUNT = 45

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      for (let i = 0; i < CLOUD_COUNT; i++) clouds.push(new NebulaCloud(canvas))
      for (let i = 0; i < SYMBOL_COUNT; i++) symbols.push(new SpiritualSymbol(canvas))
      for (let i = 0; i < SPARKLE_COUNT; i++) sparkles.push(new SparkleParticle(canvas))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      clouds.forEach(c => {
        c.update()
        c.draw(ctx)
      })

      sparkles.forEach(s => {
        s.update()
        s.draw(ctx)
      })

      symbols.forEach(s => {
        s.update()
        s.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)

    init()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default ParticleBackground
