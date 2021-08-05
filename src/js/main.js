import Director from './modules/Director.js'

const webgl = document.getElementById('webgl')
const glContext = webgl.getContext('webgl', {
	powerPreference: 'high-performance'
})

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']

const dummyObject = {
	test: 0
}

const domObject = {
	test: 0
}

const domElement = document.querySelector('.hidden-element p')

const update = () => {
	requestAnimationFrame(update)
	scene.setProgress(camera.progress)
}
requestAnimationFrame(update)

let scene = new Director.scene()

scene.to(dummyObject, { test: 100 }, { duration: 2, ease: 'linear' })
scene.addClass(domElement, { class: 'show' }, { toggle: true })

const element = document.querySelector('.sticky-element')
const camera = new Director.camera(element, scene, { pinned: true })

const h1 = document.querySelector('h1')