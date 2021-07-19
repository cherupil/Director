import Tempo from './modules/Tempo.js'

const canvas = document.getElementById('canvas')
const pixelRatio = devicePixelRatio
canvas.width = canvas.clientWidth * pixelRatio
canvas.height = canvas.clientHeight * pixelRatio

const ctx = canvas.getContext('2d')

const items = []

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']

for (var i = 0; i < 1000; i++) {
	items.push({
		fill: colors[Math.floor(Math.random() * colors.length)],
		x: ((Math.floor(Math.random() * (canvas.width * 2))) - canvas.width / 2),
		y: canvas.height + 32,
		scale: 32
	})
}

const draw = () => {
	items.forEach(item => {
		ctx.fillStyle = item.fill
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


window.addEventListener('click', _ => {
	Tempo.from(items, { x: canvas.width / 2, y: 0, scale: 0 }, { duration: 1, ease: 'easeOutSine', stagger: 0.01, onStart: () => { console.log('started') }, onUpdate: () => { console.log('updated') }, onComplete: () => { console.log('completed') } })
})


