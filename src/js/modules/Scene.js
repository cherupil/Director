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
		this.currentAnimationFrame = null
		this.paused = false
		this.rewinding = false
		this.moments = []
	}

	play() {
		const update = (currentTime) => {
			this.elapsedTime = (currentTime - this.startTime)
			this.progress = Math.min(this.elapsedTime / this.totalDuration, 1)
			this._animate()
			if (this.progress > 0 && this.progress < 1) {
				this.currentAnimationFrame = requestAnimationFrame(update)
			}
		}

		this.rewinding = false

		if (this.paused) {
			this.startTime = performance.now() - (this.totalDuration * this.progress)
		} else {
			this.startTime = performance.now()
		}

		this.paused = false

		this.currentAnimationFrame = requestAnimationFrame(update)
	}

	pause() {
		cancelAnimationFrame(this.currentAnimationFrame)
		this.paused = true
	}

	rewind() {
		const update = (currentTime) => {
			this.elapsedTime = Math.max(this.totalDuration - (currentTime - this.startTime), 0)
			this.progress = Math.min(this.elapsedTime / this.totalDuration, 1)
			this._animate()
			if (this.progress > 0 && this.progress < 1) {
				this.currentAnimationFrame = requestAnimationFrame(update)
			}
		}

		this.rewinding = true

		if (this.paused) {
			this.startTime = performance.now() - (this.totalDuration * (1 - this.progress))
		} else {
			this.startTime = performance.now()
		}

		this.paused = false

		this.currentAnimationFrame = requestAnimationFrame(update)
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
		this.moments.forEach(moment => {
			const momentTime = Math.max(this.elapsedTime - moment.timings.delay, 0)
			const momentProgress = Math.min(momentTime / moment.timings.totalDuration, 1)

			if (momentProgress > 0 && momentProgress < 1) {
				moment.options.onUpdate?.()
				moment.animations.forEach((animation, index) => {
					const staggeredProgress = Math.min((momentTime - (moment.timings.stagger * index)) / moment.timings.duration, 1)
					if (staggeredProgress > 0 && staggeredProgress < 1) {
						const latest = moment.timings.easing(staggeredProgress)
						animation.update(latest)
					} else if (staggeredProgress <= 0 && this.rewinding) {
						animation.update(0)
					} else if (staggeredProgress >= 1) {
						animation.update(1)
					}
				})
			} else if (momentProgress <= 0 && this.rewinding) {
				if (this.rewinding) {
					moment.animations.forEach(animation => {
						animation.update(0)
					})
				}
			} else if (momentProgress >= 1) {
				moment.animations.forEach(animation => {
					animation.update(1)
				})
				moment.options.onComplete?.()
			}
		})
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