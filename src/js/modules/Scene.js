import Eases from './Eases.js'
import Animation from './Animation.js'

export default class Scene {
	constructor() {
		this.timeScale = 1000
		this.moments = []
	}

	play() {
		this.moments.forEach((moment, index) => {
			let offset = 0
			if (index > 0) {
				if (moment.offset == null) {
					offset = this.moments[index - 1].timings.totalDuration
				} else {
					offset = moment.offset * this.timeScale
				}
			}

			this._animate(moment.animations, moment.timings, moment.options, offset)
		})
	}

	to(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options)

		const animations = []
		targets.forEach(target => {
			animations.push(new Animation(target, properties, 'to'))
		})

		this._add(animations, timings, options, offset)
	}

	from(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options)

		const animations = []
		targets.forEach(target => {
			animations.push(new Animation(target, properties, 'from'))
		})

		this._add(animations, timings, options, offset)
	}

	_add(animations, timings, options, offset) {
		if (this.moments.length === 0) {
			this.moments.push({ animations, timings, options, offset: 0 })
		} else {
			this.moments.push({ animations, timings, options, offset })
		}
	}

	_animate(animations, timings, options, offset) {
		function update(currentTime) {
			const elapsedTime = (currentTime - startTime) - (timings.delay + offset)
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

	_setTargets(target) {
		let targets = null
		if (Array.isArray(target)) {
			targets = target
		} else {
			targets = [target]
		}

		return targets
	}

	_setTimings(targets, options) {
		const timings = {}

		timings.duration = options.duration * this.timeScale
		timings.delay = options.delay ? (options.delay * this.timeScale) : 0
		timings.stagger = options.stagger ? (options.stagger * this.timeScale) : 0
		timings.totalDuration = timings.duration + ((targets.length - 1) * timings.stagger)
		timings.easing = Eases.get(options.ease)

		return timings
	}
}