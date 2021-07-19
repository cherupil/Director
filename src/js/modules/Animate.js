import Eases from './Eases.js'
import Animation from './Animation.js'

export default function animateTo(target, properties, options) {
	let targets = null
	if (Array.isArray(target)) {
		targets = target
	} else {
		targets = [target]
	}

	const timeScale = 1000
	const duration = options.duration * timeScale
	const delay = options.delay ? (options.delay * timeScale) : 0
	const stagger = options.stagger ? (options.stagger * timeScale) : 0
	const totalDuration = duration + ((targets.length - 1) * stagger)

	const easingFunction = Eases.get(options.ease)

	const animations = []
	targets.forEach(target => {
		animations.push(new Animation(target, properties, options))
	})

	function update(currentTime) {
		const elapsedTime = (currentTime - startTime) - delay
		const progress = Math.min(elapsedTime / totalDuration, 1)

		animations.forEach((animation, index) => {
			const staggeredProgress = Math.min((elapsedTime - (stagger * index)) / duration, 1)
			if (staggeredProgress > 0) {
				const latest = easingFunction(staggeredProgress)
				animation.update(latest)
			}
		})

		if (progress < 1) {
			options.onUpdate?.()
			requestAnimationFrame(update)
		} else {
			options.onComplete?.()
		}
	}

	options.onStart?.()
	const startTime = performance.now()
	requestAnimationFrame(update)
}