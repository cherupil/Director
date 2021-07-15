import Animation from './modules/animation.js'

const canvas = document.getElementById('canvas')
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

const ctx = canvas.getContext('2d')
ctx.fillStyle = '#32D789'

const items = []

for (var i = 0; i < 10; i++) {
	items.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height
	})
}

const draw = () => {
	items.forEach(item => {
		ctx.beginPath()
		ctx.arc(item.x, item.y, 30, 0, Math.PI * 2)
		ctx.closePath()
		ctx.fill()
	})
}

items.forEach(item => {
	Animation.tween(item, { x: Math.random() * (canvas.width - 30), y: Math.random() * (canvas.height - 30) }, 2, 'easeOutExpo', null, null)
})

const update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw()
	requestAnimationFrame(update)
}

update()

