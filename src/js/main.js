import Tween from './modules/Tween.js'

const canvas = document.getElementById('canvas')
canvas.width = canvas.clientWidth * devicePixelRatio
canvas.height = canvas.clientHeight * devicePixelRatio

const ctx = canvas.getContext('2d')
ctx.fillStyle = '#000000'

const items = []

for (var i = 0; i < 100; i++) {
	items.push({
		x: Math.floor(Math.random() * canvas.width),
		y: canvas.height
	})
}

const draw = () => {
	items.forEach(item => {
		ctx.beginPath()
		ctx.arc(item.x, item.y, 16, 0, Math.PI * 2)
		ctx.fill()
	})
}

const update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw()
}

const tween = Tween.to(items, { x: canvas.width / 2, y: 16 }, 2, 'easeOutExpo', update, update)

window.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	tween.start()
})




