import Eases from './Eases.js'
import Actor from './Actor.js'

export default class Scene {
	constructor() {
		this.timeScale = 1000
		this.duration = 0
		this.startTime = 0
		this.currentTime = 0
		this.progress = 0

		this.paused = false
		this.rewinding = false
		this.currentAnimationFrame = null
		this.previousActionDuration = 0

		this.actions = []
	}

	play() {
		this.rewinding = false

		if (this.paused) {
			this.startTime = performance.now() - (this.duration * this.progress)
		} else {
			this.startTime = performance.now()
		}
		this.paused = false
		
		const update = (currentTime) => {
			const elapsedTime = (currentTime - this.startTime)
			this.progress = Math.min(elapsedTime / this.duration, 1)

			this._animate()

			if (this.progress < 1) {
				this.currentAnimationFrame = requestAnimationFrame(update)
			}
		}

		this.currentAnimationFrame = requestAnimationFrame(update)
	}

	pause() {
		this.paused = true
		cancelAnimationFrame(this.currentAnimationFrame)
	}

	rewind() {
		this.rewinding = true

		if (this.paused) {
			this.startTime = performance.now() - (this.duration * (1 - this.progress))
		} else {
			this.startTime = performance.now()
		}
		this.paused = false
		
		const update = (currentTime) => {
			const elapsedTime = this.duration - (currentTime - this.startTime)
			this.progress = Math.min(elapsedTime / this.duration, 1)

			this._animate()

			if (this.progress > 0) {
				this.currentAnimationFrame = requestAnimationFrame(update)
			}
		}

		this.currentAnimationFrame = requestAnimationFrame(update)
	}

	setProgress(progress) {
		this.progress = progress

		const update = (currentTime) => {
			const elapsedTime = this.duration * this.progress
			this._animate()
		}

		this.currentAnimationFrame = requestAnimationFrame(update)
	}

	_animate() {
		this.currentTime = this.duration * this.progress

		this.actions.forEach((action, index) => {
			action.progress = (this.currentTime - action.timings.start) / action.timings.totalDuration

			if (action.started && !action.completed) {
				action.options.onUpdate?.()
				action.moments.forEach((moment, index) => {
					const staggerTime = Math.max((this.currentTime - action.timings.start) - (action.timings.stagger * index), 0)
					const staggerProgress = Math.min(staggerTime / action.timings.duration, 1)
					const latest = action.timings.easing(staggerProgress)
					moment.update(latest)
				})
			}

			if (action.progress > 0) {
				if (!action.started) {
					action.options.onStart?.()
					if (action.timings.start !== 0) {
						action.moments.forEach(moment => {
							moment.setProperties()
						})
					}
				}
				action.started = true
			} else {
				if (action.started && action.direction === 'from') {
					if (action.timings.start !== 0) {
						action.moments.forEach(moment => {
							moment.update(1)
						})
					} else {
						action.moments.forEach(moment => {
							moment.update(0)
						})
					}
				} else if (!action.started && !action.initialized && action.direction === 'from') {
					action.moments.forEach(moment => {
						moment.update(0)
					})
					action.initialized = true
				}
				action.started = false
			}

			if (action.progress >= 1) {
				if (!action.completed) {
					action.options.onComplete?.()
					action.moments.forEach(moment => {
						moment.update(1)
					})
				}
				action.completed = true
			} else {
				action.completed = false
			}
		})
	}

	to(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options, offset)

		const moments = []
		targets.forEach(target => {
			moments.push(new Actor(target, properties, 'to'))
		})

		this._add(moments, timings, options, 'to')
	}

	from(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options, offset)

		const moments = []
		targets.forEach(target => {
			moments.push(new Actor(target, properties, 'from'))
		})

		this._add(moments, timings, options, 'from')
	}

	_add(moments, timings, options, direction) {
		this.actions.push({ moments, timings, options, direction, progress: 0, initialized: false, started: false, completed: false })
		this.setProgress(0)
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

		const timeScaledDuration = options.duration * this.timeScale

		let actionOffset = 0
		if (offset !== null) {
			actionOffset = offset * this.timeScale
		} else {
			actionOffset = this.previousActionDuration
		}

		timings.stagger = options.stagger ? (options.stagger * this.timeScale) : 0

		const delay = options.delay ? (options.delay * this.timeScale) + actionOffset : actionOffset
		const duration = timeScaledDuration + ((targets.length - 1) * timings.stagger)

		timings.start = delay
		timings.end = delay + duration
		timings.duration = timeScaledDuration
		timings.totalDuration = duration
		timings.easing = Eases.get(options.ease)

		this.previousActionDuration = timings.end
		this.duration = Math.max(this.previousActionDuration, this.duration)

		return timings
	}
}