import Tempo from './modules/Tempo.js'

const canvas = document.getElementById('canvas')
const pixelRatio = devicePixelRatio
canvas.width = canvas.clientWidth * pixelRatio
canvas.height = canvas.clientHeight * pixelRatio

const webgl = document.getElementById('webgl')
const glContext = webgl.getContext('webgl', {
	powerPreference: 'high-performance'
})

const ctx = canvas.getContext('2d')

const items = []

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']

for (var i = 0; i < 3; i++) {
	items.push({
		fill: colors[Math.floor(Math.random() * colors.length)],
		x: canvas.width / 3,
		y: (canvas.height / 4) * (i + 1),
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

let scene

setTimeout(() => {
	scene = new Tempo.scene()

	scene.to(items[0], { x: (canvas.width / 3) * 2, scale: 0 }, { duration: 2, ease: 'easeOutExpo' })
	scene.from(items[1], { x: (canvas.width / 3) * 2, scale: 0 }, { duration: 4, ease: 'easeOutExpo' }, 0.25)
	scene.to(items[2], { x: (canvas.width / 3) * 2, scale: 0 }, { duration: 2, ease: 'easeOutExpo' })

	scene.play()
}, 500)

window.addEventListener('click', _ => {
	scene.pause()
})


