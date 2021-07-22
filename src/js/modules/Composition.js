import Eases from './Eases.js'
import Animation from './Animation.js'

export default class Composition {
	constructor() {
		this.timeScale = 1000
		this.duration = 0
		this.startTime = 0
		this.currentTime = 0
		this.progress = 0

		this.paused = false
		this.rewinding = false
		this.currentAnimationFrame = null
		this.previousVoiceDuration = 0

		this.voices = []
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

		this.voices.forEach((voice, index) => {
			voice.progress = (this.currentTime - voice.timings.start) / voice.timings.duration

			if (voice.started && !voice.completed) {
				voice.motifs.forEach((motif, index) => {
					const staggerTime = Math.max((this.currentTime - voice.timings.start) - (voice.timings.stagger * index), 0)
					const staggerProgress = Math.min(staggerTime / voice.timings.duration, 1)
					const latest = voice.timings.easing(staggerProgress)
					motif.update(latest)
				})
			}

			if (voice.progress > 0) {
				if (!voice.started) {
					if (index !== 0) {
						voice.motifs.forEach(motif => {
							motif.setProperties()
						})
					}
				}
				voice.started = true
			} else {
				if (voice.started && voice.direction === 'from') {
					if (index !== 0) {
						voice.motifs.forEach(motif => {
							motif.update(1)
						})
					} else {
						voice.motifs.forEach(motif => {
							motif.update(0)
						})
					}
				} else if (!voice.started && !voice.initialized && voice.direction === 'from') {
					voice.motifs.forEach(motif => {
						motif.update(0)
					})
					voice.initialized = true
				}
				voice.started = false
			}

			if (voice.progress >= 1) {
				if (!voice.completed) {
					voice.motifs.forEach(motif => {
						motif.update(1)
					})
				}
				voice.completed = true
			} else {
				voice.completed = false
			}
		})
	}

	to(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options, offset)

		const motifs = []
		targets.forEach(target => {
			motifs.push(new Animation(target, properties, 'to'))
		})

		this._add(motifs, timings, options, 'to')
	}

	from(target, properties, options, offset = null) {
		const targets = this._setTargets(target)
		const timings = this._setTimings(targets, options, offset)

		const motifs = []
		targets.forEach(target => {
			motifs.push(new Animation(target, properties, 'from'))
		})

		this._add(motifs, timings, options, 'from')
	}

	_add(motifs, timings, options, direction) {
		this.voices.push({ motifs, timings, options, direction, progress: 0, initialized: false, started: false, completed: false })
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

		let voiceOffset = 0
		if (offset !== null) {
			voiceOffset = offset * this.timeScale
		} else {
			voiceOffset = this.previousVoiceDuration
		}

		timings.stagger = options.stagger ? (options.stagger * this.timeScale) : 0

		const delay = options.delay ? (options.delay * this.timeScale) + voiceOffset : voiceOffset
		const duration = timeScaledDuration + ((targets.length - 1) * timings.stagger)

		timings.start = delay
		timings.end = delay + duration
		timings.duration = duration
		timings.easing = Eases.get(options.ease)

		this.previousVoiceDuration = timings.end
		this.duration = Math.max(this.previousVoiceDuration, this.duration)

		return timings
	}
}