const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const fps = 30
const interval = 1000 / fps
let lastTime = 0
let requestAnimationFrameRef
const particlesArray = []

const mouse = {
    x: null,
    y: null,
    radius: 25000
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
})

window.addEventListener('resize', () => {
    cancelAnimationFrame(requestAnimationFrameRef)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    animate(0)
})

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y
        this.size = 3
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 30) + 1
    }

    draw() {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }

    update() {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = dx * dx + dy * dy
        if (distance < mouse.radius)
            this.size = 5
        else
            this.size = 3
    }
}


function inti() {
    for (let index = 0; index < 500; index++) {
        const randomX = Math.floor(Math.random() * canvas.width)
        const randomY = Math.floor(Math.random() * canvas.height)
        particlesArray.push(new Particle(randomX, randomY))
    }
}

inti()

function animate(timestamp) {
    const elapsedTime = timestamp - lastTime
    if (elapsedTime > interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].draw()
            particlesArray[i].update()
        }
        lastTime = timestamp
    }
    requestAnimationFrameRef = requestAnimationFrame(animate)
}

animate(0)