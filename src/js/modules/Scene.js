import Eases from './Eases.js'
import Animation from './Animation.js'

export default class Scene {
	constructor() {
		this.timeScale = 1000
		this.startTime = 0
		this.elapsedTime = 0
		this.progress = 0
		this.previousMomentDuration = 0
		this.totalDuration = 0
		this.moments = []
	}

	play() {
		this._animate()
	}

	to(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options, offset)

		const animations = []
		targets.forEach(target => {
			animations.push(new Animation(target, properties, 'to'))
		})

		this._add(animations, timings, options)
	}

	from(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options, offset)

		const animations = []
		targets.forEach(target => {
			animations.push(new Animation(target, properties, 'from'))
		})

		this._add(animations, timings, options)
	}

	_add(animations, timings, options) {
		if (this.moments.length === 0) {
			this.moments.push({ animations, timings, options })
		} else {
			this.moments.push({ animations, timings, options })
		}
	}

	_animate() {
		const update = (currentTime) => {
			this.elapsedTime = (currentTime - this.startTime)
			this.progress = Math.min(this.elapsedTime / this.totalDuration, 1)

			this.moments.forEach(moment => {
				const momentTime = this.elapsedTime - moment.timings.delay
				const momentProgress = Math.min(momentTime / moment.timings.totalDuration, 1)

				if (momentProgress < 1) {
					moment.options.onUpdate?.()
					moment.animations.forEach((animation, index) => {
						const staggeredProgress = Math.min((momentTime - (moment.timings.stagger * index)) / moment.timings.duration, 1)
						if (staggeredProgress > 0) {
							const latest = moment.timings.easing(staggeredProgress)
							animation.update(latest)
						}
					})
				} else {
					moment.options.onComplete?.()
				}
			})

			if (this.progress < 1) {
				requestAnimationFrame(update)
			}
		}

		this.startTime = performance.now()
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

	_setTimings(targets, options, offset) {
		const timings = {}

		timings.duration = options.duration * this.timeScale
		if (offset !== null) {
			timings.offset = offset * this.timeScale
		} else {
			timings.offset = this.previousMomentDuration
		}
		timings.delay = options.delay ? (options.delay * this.timeScale) + timings.offset : timings.offset
		timings.stagger = options.stagger ? (options.stagger * this.timeScale) : 0
		timings.totalDuration = timings.duration + ((targets.length - 1) * timings.stagger)
		timings.easing = Eases.get(options.ease)

		this.previousMomentDuration = timings.totalDuration + timings.delay
		this.totalDuration = Math.max(this.previousMomentDuration, this.totalDuration)

		return timings
	}
}