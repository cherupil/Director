import Director from './modules/Director.js'

const webgl = document.getElementById('webgl')
const glContext = webgl.getContext('webgl', {
	powerPreference: 'high-performance'
})

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']

const rowItems = []

for (let i = 0; i < 3; i++) {
	rowItems.push({
		translateX: 0
	})
}

const imageRows = document.querySelectorAll('.images-row')

const root = document.documentElement

const update = () => {
	imageRows.forEach((row, index) => {
		row.style.transform = `translateX(${rowItems[index].translateX}px)`
	})
	requestAnimationFrame(update)
	scene.setProgress(dolly.progress)
}
requestAnimationFrame(update)

let scene = new Director.scene()

scene.to(rowItems[0], { translateX: 500 }, { duration: 1, ease: 'linear' })
scene.to(rowItems[1], { translateX: -500 }, { duration: 1, ease: 'linear' }, 0)
scene.to(rowItems[2], { translateX: 250 }, { duration: 1, ease: 'linear' }, 0)

const element = document.querySelector('.animated-element')
const dolly = new Director.dolly(element, scene)