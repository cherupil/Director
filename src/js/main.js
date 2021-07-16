import animate from './modules/Animate.js'

const canvas = document.getElementById('canvas')
canvas.width = canvas.clientWidth * devicePixelRatio
canvas.height = canvas.clientHeight * devicePixelRatio

const ctx = canvas.getContext('2d')
ctx.fillStyle = '#000000'

const items = []

for (var i = 0; i < 1; i++) {
	items.push({
		x: canvas.width / 3,
		y: canvas.height / 2,
		alpha: 1
	})
}

const draw = () => {
	ctx.fillStyle = `rgba(0, 0, 0, ${items[0].alpha})`

	items.forEach(item => {
		ctx.beginPath()
		ctx.arc(item.x, item.y, 64, 0, Math.PI * 2)
		ctx.fill()
	})
}

const update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw()
	requestAnimationFrame(update)
}

requestAnimationFrame(update)

window.addEventListener('click', _ => {
	animate(items, { x: (canvas.width / 3) * 2 }, { duration: 4, ease: 'easeOutSpring' })
})


