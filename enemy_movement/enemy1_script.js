/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = (canvas.width = 500)
const CANVAS_HEIGHT = (canvas.height = 1000)

const numberOFEnemies = 10

let gameFrame = 0

const enemies = []

class Enemy {
  constructor(image) {
    this.image = new Image()
    this.image.src = image

    // this.speed = Math.random() * 4 - 2
    this.spriteWidth = 293
    this.spriteHeight = 155
    this.width = this.spriteWidth / 2.5
    this.height = this.spriteHeight / 2.5
    this.x = Math.random() * (CANVAS_WIDTH - this.width)
    this.y = Math.random() * (CANVAS_HEIGHT - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
  }

  update() {
    this.x += Math.random() * 5 - 2.5
    this.y += Math.random() * 5 - 2.5
    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
    if (gameFrame > 100) gameFrame = 0
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

for (let i = 0; i < numberOFEnemies; i++) {
  enemies.push(new Enemy('assets/enemy1.png'))
}

function clearCanvasBeforeEveryFrame() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function animateLoop() {
  clearCanvasBeforeEveryFrame()

  enemies.forEach(enemy => {
    enemy.update()
    enemy.draw()
  })

  gameFrame++
  requestAnimationFrame(animateLoop)
}

animateLoop()
