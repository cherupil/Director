import Director from './modules/Director.js'

const webgl = document.getElementById('webgl')
const glContext = webgl.getContext('webgl', {
	powerPreference: 'high-performance'
})

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']

const domObject = {
	test: 0
}

const canvas = document.querySelector('.canvas')
canvas.width = canvas.getBoundingClientRect().width * 2
canvas.height = canvas.getBoundingClientRect().height * 2
const ctx = canvas.getContext('2d')
const copyItemElements = document.querySelectorAll('.copy-item')
const hiddenElement = document.querySelector('.hidden-element p')

const canvasObject = {
	circleOneRadius: canvas.height,
	circleTwoRadius: 0,
	circleThreeRadius: 0,
	lineWidth: 25,
	squareSize: 0,
	squareSizeTwo: 0
}

ctx.strokeStyle = '#32D789'
ctx.lineWidth = 4

const update = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = '#36EFB1'
	ctx.beginPath()
	ctx.arc(canvas.width / 2, canvas.height / 2, canvasObject.circleOneRadius, 0, Math.PI * 2, false)
	ctx.closePath()
	ctx.fill()
	ctx.fillStyle = '#6EE4FF'
	ctx.beginPath()
	ctx.arc(canvas.width / 2, canvas.height / 2, canvasObject.circleTwoRadius, 0, Math.PI * 2, false)
	ctx.closePath()
	ctx.fill()
	ctx.fillStyle = '#FFFFFF'
	ctx.beginPath()
	ctx.arc(canvas.width / 2, canvas.height / 2, canvasObject.circleThreeRadius, 0, Math.PI * 2, false)
	ctx.closePath()
	ctx.fill()
	ctx.beginPath()
	ctx.fillStyle = '#03330A'
	ctx.fillRect((canvas.width / 2) - (canvasObject.lineWidth / 2), 400, canvasObject.lineWidth, canvas.height - 800)
	ctx.fill()
	ctx.closePath()
	ctx.beginPath()
	ctx.fillStyle = '#031F33'
	ctx.fillRect((canvas.width / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSizeTwo), (canvas.height / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSizeTwo), canvasObject.squareSizeTwo, canvasObject.squareSizeTwo)
	ctx.fillRect((canvas.width / 2) + (canvasObject.circleThreeRadius / 3), (canvas.height / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSizeTwo), canvasObject.squareSizeTwo, canvasObject.squareSizeTwo)
	ctx.fillRect((canvas.width / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSizeTwo), (canvas.height / 2) + (canvasObject.circleThreeRadius / 3), canvasObject.squareSizeTwo, canvasObject.squareSizeTwo)
	ctx.fillRect((canvas.width / 2) + (canvasObject.circleThreeRadius / 3), (canvas.height / 2) + (canvasObject.circleThreeRadius / 3), canvasObject.squareSizeTwo, canvasObject.squareSizeTwo)
	ctx.strokeRect((canvas.width / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), (canvas.height / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), canvasObject.squareSize, canvasObject.squareSize)
	ctx.strokeRect((canvas.width / 2) + (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), (canvas.height / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), canvasObject.squareSize, canvasObject.squareSize)
	ctx.strokeRect((canvas.width / 2) - (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), (canvas.height / 2) + (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), canvasObject.squareSize, canvasObject.squareSize)
	ctx.strokeRect((canvas.width / 2) + (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), (canvas.height / 2) + (canvasObject.circleThreeRadius / 3) - (canvasObject.squareSize / 2), canvasObject.squareSize, canvasObject.squareSize)
	ctx.closePath()
	scene.setProgress(camera.progress)
	requestAnimationFrame(update)
}
requestAnimationFrame(update)

let scene = new Director.Scene()

scene.to(canvasObject, { circleOneRadius: 0, circleTwoRadius: (canvas.height / 2) - 1 }, { duration: 1.845, ease: 'linear' })
scene.to(canvasObject, { circleThreeRadius: (canvas.height / 4) }, { duration: 1.5, ease: 'easeOutExpo' }, 0)
scene.to(canvasObject, { lineWidth: 100 }, { duration: 1, ease: 'linear' }, 0)
scene.to(canvasObject, { squareSize: 100 }, { duration: 1, ease: 'easeOutExpo' }, 1)
scene.to(canvasObject, { squareSizeTwo: 150 }, { duration: 0.75, ease: 'easeOutExpo' }, 1.25)
scene.addClass(copyItemElements[0], { class: 'show' }, { toggle: true }, 0)
scene.fromTo(copyItemElements[1], { opacity: [0, 1], translateX: [-100, 100] }, { duration: 1 }, 0.4)
scene.addClass(copyItemElements[2], { class: 'show' }, { toggle: true }, 0.8)
scene.addClass(hiddenElement, { class: 'show' }, { toggle: true }, 2)

const element = document.querySelector('.sticky-element')
const camera = new Director.Camera(element, scene, { pinned: true, offset: 155 })

const h1 = document.querySelector('h1')