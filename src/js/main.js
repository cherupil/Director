import Tempo from './modules/Tempo.js'

const webgl = document.getElementById('webgl')
const glContext = webgl.getContext('webgl', {
	powerPreference: 'high-performance'
})

const colors = ['#FFE7E5', '#FFBDAF', '#E65F5C', '#E8FFEE', '#36EFB1', '#32D789', '#E8F4FF', '#6EE4FF', '#41C0EC', '#72FFF9', '#67E6E0', '#387D7A']

const copyItems = []
copyItems.push({
	yOffset: 50,
	opacity: 0
})
copyItems.push({
	yOffset: 50,
	opacity: 0
})
copyItems.push({
	yOffset: 50,
	opacity: 0
})

const imageItems = []
imageItems.push({
	scale: 1,
	rotateY: 0,
	rotateX: 0,
	translateX: 0
})
imageItems.push({
	scale: 1,
	rotateY: 0,
	rotateX: 0,
	translateX: 0
})
imageItems.push({
	scale: 1,
	rotateY: 0,
	rotateX: 0,
	translateX: 0
})



const copyItemsElements = document.querySelectorAll('.copy-item')
const imageElements = document.querySelectorAll('.image-item')

let scrollProgress = 0

const update = () => {
	imageElements.forEach((item, index) => {
		item.style.transform = `translateX(${imageItems[index].translateX}px) rotateY(${imageItems[index].rotateY}deg) rotateX(${imageItems[index].rotateX}deg) scale(${imageItems[index].scale})`
	})
	copyItemsElements.forEach((item, index) => {
		item.style.opacity = copyItems[index].opacity
		item.style.transform = `translateY(${copyItems[index].yOffset}px)`
	})
	requestAnimationFrame(update)
	composition.setProgress(scrollProgress)
}
requestAnimationFrame(update)

let composition = new Tempo.composition()
copyItems.forEach((item, index) => {
	composition.to(item, { yOffset: -50 }, { 
		duration: 1, 
		ease: 'linear'
	})
	composition.to(item, { opacity: 1 }, {
		duration: 0.25,
		ease: 'linear'
	}, 0 + index)
	composition.to(item, { opacity: 0 }, {
		duration: 0.25,
		ease: 'linear'
	}, 0.75 + index)
})
composition.from(imageItems, { scale: 0 }, { duration: 1, ease: 'linear' }, 0)
composition.to(imageItems[0], { translateX: -250 }, { duration: 1, ease: 'linear' }, 1)
composition.to(imageItems[2], { translateX: 250 }, { duration: 1, ease: 'linear' }, 1)
composition.to(imageItems[0], { translateX: -125 }, { duration: 1, ease: 'linear' }, 2)
composition.to(imageItems[2], { translateX: 125 }, { duration: 1, ease: 'linear' }, 2)
composition.to(imageItems, { rotateY: 30, rotateX: 30 }, { duration: 1, ease: 'linear' }, 2)


const stickyElement = document.querySelector('.sticky-element')
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			window.addEventListener('scroll', scrollListener)
		} else {
			window.removeEventListener('scroll', scrollListener)
		}
	})
}, { threshold: 1 })
observer.observe(stickyElement)

const scrollMultiplier = 1
const content = document.querySelector('.sticky-wrapper')
content.style.height = `${(scrollMultiplier * composition.duration) + window.innerHeight}px`
const scrollHeight = (scrollMultiplier * composition.duration)

const scrollListener = (event) => {
	const scrollDistance = event.target.scrollingElement.scrollTop
	const scrollPosition = scrollDistance - content.offsetTop
	scrollProgress = Math.min(Math.max(scrollPosition / scrollHeight, 0), 1)
}