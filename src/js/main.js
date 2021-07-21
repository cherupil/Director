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

const circles = []

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']

for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		circles.push({
			fill: colors[Math.floor(Math.random() * colors.length)],
			x: (canvas.width / 4) * (j + 1),
			y: (canvas.height / 4) * (i + 1),
			scale: 0
		})
	}
}

const draw = () => {
	circles.forEach(circle => {
		ctx.fillStyle = circle.fill
		ctx.beginPath()
		ctx.arc(circle.x, circle.y, circle.scale, 0, Math.PI * 2)
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

	scene.to(circles, { scale: 32 }, { duration: 1, ease: 'easeOutExpo', stagger: 0.05, onComplete: () => { console.log('done') } })

	scene.play()
}, 500)

window.addEventListener('click', _ => {
	if (scene.paused) {
		if (scene.rewinding) {
			scene.play()
		} else {
			scene.rewind()
		}
	} else {
		scene.pause()
	}
})


