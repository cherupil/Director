import Eases from './eases.js'

export default class Animation {
	static tween(object, properties, duration, ease, onUpdate = null, onComplete = null) {
		const easingFunction = Eases.get(ease)

		const starts = {},
			  deltas = {},
			  startTime = performance.now()

		for (const property in properties) {
			starts[property] = object[property]
			deltas[property] = properties[property] - starts[property]
		}

		const update = (currentTime) => {
			let elapsedTime = currentTime - startTime

			if (elapsedTime < (duration * 1000)) {
				for (const property in properties) {
					object[property] = easingFunction(elapsedTime, starts[property], deltas[property], (duration * 1000))
				}
				if (onUpdate) onUpdate()
				requestAnimationFrame(update)
			} else {
				elapsedTime = (duration * 1000)
				for (const property in properties) {
					object[property] = easingFunction(elapsedTime, starts[property], deltas[property], (duration * 1000))
				}
				if (onComplete) onComplete()
			}
		}

		requestAnimationFrame(update)
	}
}