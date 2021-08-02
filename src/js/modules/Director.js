import Eases from './Eases.js'
import Animation from './Animation.js'
import Scene from './Scene.js'
import Dolly from './Dolly.js'

export default class Director {
	static to(target, properties, options) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options)

		const animations = []
		targets.forEach(target => {
			animations.push(new Animation(target, properties, 'to'))
		})

		this._animate(animations, timings, options)
	}

	static from(target, properties, options) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options)

		const animations = []
		targets.forEach(target => {
			animations.push(new Animation(target, properties, 'from'))
		})

		this._animate(animations, timings, options)
	}

	static _animate(animations, timings, options) {
		function update(currentTime) {
			const elapsedTime = (currentTime - startTime) - timings.delay
			const progress = Math.min(elapsedTime / timings.totalDuration, 1)

			animations.forEach((animation, index) => {
				const staggeredProgress = Math.min((elapsedTime - (timings.stagger * index)) / timings.duration, 1)
				if (staggeredProgress > 0) {
					const latest = timings.easing(staggeredProgress)
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

	static _setTargets(target) {
		let targets = null
		if (Array.isArray(target)) {
			targets = target
		} else {
			targets = [target]
		}

		return targets
	}

	static _setTimings(targets, options) {
		const timeScale = 1000
		const timings = {}

		timings.duration = options.duration * timeScale
		timings.delay = options.delay ? (options.delay * timeScale) : 0
		timings.stagger = options.stagger ? (options.stagger * timeScale) : 0
		timings.totalDuration = timings.duration + ((targets.length - 1) * timings.stagger)
		timings.easing = Eases.get(options.ease)

		return timings
	}
}

Director.scene = Scene
Director.dolly = Dolly