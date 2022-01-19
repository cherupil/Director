import Director from '../../../dist/js/director.min.js'

//Demo Setup
let DOMTranslateX = 0
const DOMToElement = document.querySelector('.dom-to--card')

const calculateTranslateXOffset = () => {
	const cardBounds = DOMToElement.getBoundingClientRect()
	const containerBounds = DOMToElement.parentNode.getBoundingClientRect()
	
	const cardWidth = cardBounds.width
	const containerWidth = containerBounds.width - 32
	const cardToContainerRatio = cardWidth / containerWidth
	const translateDistance = (1 - cardToContainerRatio) / cardToContainerRatio
	return translateDistance * 100
}

DOMTranslateX = calculateTranslateXOffset()

window.addEventListener('resize', () => {
	DOMTranslateX = calculateTranslateXOffset()
})

/*
DOM Tweens
*/

//To
const DOMToButton = document.getElementById('dom-to--button')
const DOMToReset = document.getElementById('dom-to--reset')

DOMToButton.addEventListener('click', () => {
	DOMToButton.setAttribute('disabled', true)
	DOMToReset.setAttribute('disabled', true)

	Director.to(DOMToElement, { translateX: DOMTranslateX }, { duration: 1, ease: 'easeInOutQuint', onComplete: () => {
		DOMToReset.removeAttribute('disabled')
	} })
})

DOMToReset.addEventListener('click', () => {
	DOMToElement.style.transform = ``
	DOMToButton.removeAttribute('disabled')
})

//From
const DOMFromButton = document.getElementById('dom-from--button')
const DOMFromReset = document.getElementById('dom-from--reset')
const DOMFromElement = document.querySelector('.dom-from--card')

DOMFromButton.addEventListener('click', () => {
	DOMFromButton.setAttribute('disabled', true)
	DOMFromReset.setAttribute('disabled', true)
	
	Director.from(DOMFromElement, { translateX: DOMTranslateX }, { duration: 1, ease: 'easeInOutQuint', onComplete: () => {
		DOMFromReset.removeAttribute('disabled')
	} })
})

DOMFromReset.addEventListener('click', () => {
	DOMFromElement.style.transform = ``
	DOMFromButton.removeAttribute('disabled')
})

//FromTo
const DOMFromToButton = document.getElementById('dom-fromto--button')
const DOMFromToReset = document.getElementById('dom-fromto--reset')
const DOMFromToElement = document.querySelector('.dom-fromto--card')

DOMFromToButton.addEventListener('click', () => {
	DOMFromToButton.setAttribute('disabled', true)
	DOMFromToReset.setAttribute('disabled', true)
	
	Director.fromTo(DOMFromToElement, { translateX: [DOMTranslateX, DOMTranslateX / 2] }, { duration: 1, ease: 'easeInOutQuint', onComplete: () => {
		DOMFromToReset.removeAttribute('disabled')
	} })
})

DOMFromToReset.addEventListener('click', () => {
	DOMFromToElement.style.transform = ``
	DOMFromToButton.removeAttribute('disabled')
})

/*
Scene
*/

const DOMSceneButton = document.getElementById('dom-scene--button')
const DOMSceneReset = document.getElementById('dom-scene--reset')
const DOMSceneBackground = document.querySelector('.stagger-scene .stagger-background--two')
const DOMSceneCards = document.querySelectorAll('.stagger-scene .stagger-item')

const DOMScene = new Director.Scene()
DOMScene.fromTo(DOMSceneCards, { scale: [1, 0], opacity: [1, 0] }, { duration: 1, ease: 'easeOutQuint', stagger: 0.1 }, 0)
DOMScene.fromTo(DOMSceneBackground, { scale: [0, 1], opacity: [0, 1] }, { duration: 1, ease: 'easeOutQuint', onComplete: () => {
	DOMSceneReset.removeAttribute('disabled')
} }, 0.25)

DOMSceneButton.addEventListener('click', () => {
	DOMSceneButton.setAttribute('disabled', true)
	DOMSceneReset.setAttribute('disabled', true)
	
	DOMScene.play()
})

DOMSceneReset.addEventListener('click', () => {
	DOMScene.setProgress(0)
	DOMSceneButton.removeAttribute('disabled')
})

/*
Camera
*/

const DOMCameraWrapper = document.querySelector('.stagger-camera')
const DOMCameraBackground = document.querySelector('.stagger-camera .stagger-background--two')
const DOMCameraCards = document.querySelectorAll('.stagger-camera .stagger-item')

const DOMCameraScene = new Director.Scene()
DOMCameraScene.fromTo(DOMCameraCards, { scale: [1, 0], opacity: [1, 0] }, { duration: 1, ease: 'easeOutQuint', stagger: 0.1 }, 0)
DOMCameraScene.fromTo(DOMCameraBackground, { scale: [0, 1], opacity: [0, 1] }, { duration: 1, ease: 'easeOutQuint' }, 0.25)

const DOMCamera = new Director.Camera(DOMCameraWrapper, DOMCameraScene)

const update = () => {
	DOMCameraScene.setProgress(DOMCamera.progress)
	draw()
	window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

/*
JavaScript Object Tweens
*/

const animationObject = {
	circleOne: 0,
	circleTwo: 1024,
	opacity: 0.25
}

let JSCameraProgress = 0

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 1024

const draw = () => {
	context.clearRect(0, 0, 1024, 1024)
	context.fillStyle = `rgba(104, 189, 231, ${animationObject.opacity})`

	context.beginPath()
    context.arc(animationObject.circleOne, 
        512, 
        256, 
        0, 
        Math.PI * 2, 
        true
    )
    context.closePath()
    context.fill()

    context.beginPath()
    context.arc(animationObject.circleTwo, 
        512, 
        256, 
        0, 
        Math.PI * 2, 
        true
    )
    context.closePath()
    context.fill()
}

const JSScene = new Director.Scene()
JSScene.fromTo(animationObject, { circleOne: [0, 384], circleTwo: [1024, 640], opacity: [0.0, 0.5] }, { duration: 1, ease: 'easeInOutQuint' }, 0)
JSScene.setProgress(0.5)

const input = document.querySelector('input')
input.addEventListener('input', event => {
	JSScene.setProgress(event.target.value)
})
