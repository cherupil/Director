import animateTo from './modules/Animate.js'

const canvas = document.getElementById('canvas')
const pixelRatio = devicePixelRatio
canvas.width = canvas.clientWidth * pixelRatio
canvas.height = canvas.clientHeight * pixelRatio

const ctx = canvas.getContext('2d')

const items = []

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#761111', '#282524', '#E8FFEE', '#36EFB1', '#32D789', '#03330A', '#242825', '#E8F4FF', '#6EE4FF', '#41C0EC', '#031F33', '#242528', '#72FFF9', '#67E6E0', '#387D7A', '#173332', '#242424']

for (var i = 0; i < 100; i++) {
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
	animateTo(items, { x: canvas.width / 2, y: 0, scale: 0 }, { duration: 1, delay: 1, ease: 'easeOutSine', stagger: 0.001, onStart: () => { console.log('started') }, onUpdate: () => { console.log('updated') }, onComplete: () => { console.log('completed') } })
})


