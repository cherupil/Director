import Eases from './Eases.js'
import Animation from './Animation.js'

export default function animate(target, properties, options) {
	let targets = null

	if (Array.isArray(target)) {
		targets = target
	} else {
		targets = [target]
	}

	const duration = options.duration * 1000
	const easingFunction = Eases.get(options.ease)

	const animations = []

	targets.forEach(target => {
		animations.push(new Animation(target, properties, options))
	})

	function update(currentTime) {
		const elapsedTime = currentTime - startTime
		const progress = Math.min(elapsedTime / duration, 1)
		const latest = easingFunction(progress)

		animations.forEach(animation => {
			animation.update(latest)
		})

		if (progress < 1) {
			requestAnimationFrame(update)
		}
	}

	const startTime = performance.now()
	requestAnimationFrame(update)
}