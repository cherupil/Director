import animate from './modules/Animate.js'

const canvas = document.getElementById('canvas')
canvas.width = canvas.clientWidth * devicePixelRatio
canvas.height = canvas.clientHeight * devicePixelRatio

const ctx = canvas.getContext('2d')
ctx.fillStyle = '#000000'

const items = []

for (var i = 0; i < 10; i++) {
	items.push({
		x: Math.floor(Math.random() * (canvas.width - 128)) + 64,
		y: Math.floor(Math.random() * (canvas.height - 128)) + 64,
		alpha: 1,
		scale: 64
	})
}

const draw = () => {
	ctx.fillStyle = `rgba(0, 0, 0, ${items[0].alpha})`

	items.forEach(item => {
		ctx.beginPath()
		ctx.arc(item.x, item.y, item.scale, 0, Math.PI * 2)
		ctx.fill()
	})
}

const update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw()
	requestAnimationFrame(update)
}

requestAnimationFrame(update)

window.addEventListener('click', (event) => {
	items.forEach(item => {
		item.x = Math.floor(Math.random() * (canvas.width - 128)) + 64,
		item.y = Math.floor(Math.random() * (canvas.height - 128)) + 64,
		item.alpha = 1
		item.scale = 64
	})

	animate(items, { x: event.clientX * devicePixelRatio, y: event.clientY * devicePixelRatio, alpha: 0, scale: 0 }, { duration: 1, ease: 'easeOutExpo', stagger: 0.05 })
})


