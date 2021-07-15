import Eases from './eases.js'

export default class Tween {
	constructor(target, properties, duration, ease, onUpdate = null, onComplete = null) {
		if (Array.isArray(target)) {
			this.targets = target
		} else {
			this.targets = [target]
		}

		this.properties = properties
		this.duration = duration * 1000
		this.easingFunction = Eases.get(ease)
		this.onUpdate = onUpdate
		this.onComplete = onComplete
		this.targetIsArray = false

		this.propertyDeltas = []

		this.targets.forEach(target => {
			const targetProperties = {}

			for (const property in this.properties) {
				targetProperties[property] = {
					start: target[property],
					delta: this.properties[property] - target[property]
				}
			}

			this.propertyDeltas.push(targetProperties)
		})

		this.currentAnimationFrame = null
		this.update = this.update.bind(this)
	}

	start() {
		if (this.currentAnimationFrame) {
			cancelAnimationFrame(this.currentAnimationFrame)
		}

		this.startTime = performance.now()
		requestAnimationFrame(this.update)
	}

	update(currentTime) {
		const elapsedTime = currentTime - this.startTime
		const progress = Math.min(elapsedTime / this.duration, 1)
		const latest = this.easingFunction(progress)

		this.targets.forEach((target, index) => {
			for (const property in this.properties) {
				target[property] = this.propertyDeltas[index][property].start + latest * this.propertyDeltas[index][property].delta
			}
		})

		if (this.onUpdate) this.onUpdate()

		if (progress < 1) {
			this.currentAnimationFrame = requestAnimationFrame(this.update)
		} else {
			if (this.onComplete) this.onComplete()
		}
	}

	static to(target, properties, duration, ease, onUpdate = null, onComplete = null) {
		return new Tween(target, properties, duration, ease, onUpdate, onComplete)
	}
}