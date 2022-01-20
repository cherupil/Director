import Eases from './Eases.js'
import Actor from './Actor.js'
import Scene from './Scene.js'
import Camera from './Camera.js'

export default class Director {
	static to(target, properties, options) {
		let isDOM = false
		let input = target
		if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
			isDOM = true
			if (target instanceof window.NodeList) {
				input = [...target]
			}
		}
		const targets = this._setTargets(input)
		const timings = this._setTimings(targets, options)

		const actors = []
		targets.forEach(target => {
			actors.push(new Actor(target, properties, 'to', isDOM))
		})

		this._animate(actors, timings, options)
	}

	static from(target, properties, options) {
		let isDOM = false
		let input = target
		if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
			isDOM = true
			if (target instanceof window.NodeList) {
				input = [...target]
			}
		}
		const targets = this._setTargets(input)
		const timings = this._setTimings(targets, options)

		const actors = []
		targets.forEach(target => {
			actors.push(new Actor(target, properties, 'from', isDOM))
		})

		this._animate(actors, timings, options)
	}

	static fromTo(target, properties, options) {
		let isDOM = false
		let input = target
		if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
			isDOM = true
			if (target instanceof window.NodeList) {
				input = [...target]
			}
		}
		const targets = this._setTargets(input)
		const timings = this._setTimings(targets, options)

		const actors = []
		targets.forEach(target => {
			actors.push(new Actor(target, properties, 'fromTo', isDOM))
		})

		this._animate(actors, timings, options)
	}

	static addClass(target, properties, options) {
		let isDOM = false
		let input = target
		let optionsObject = options ? options : {}
		if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
			isDOM = true
			if (target instanceof window.NodeList) {
				input = [...target]
			}
		}
		const targets = this._setTargets(input)
		const timings = this._setTimings(targets, optionsObject)

		const actors = []
		targets.forEach(target => {
			actors.push(new Actor(target, properties, 'addClass', isDOM))
		})

		this._animate(actors, timings, optionsObject)
	}

	static removeClass(target, properties, options) {
		let isDOM = false
		let input = target
		let optionsObject = options ? options : {}
		if (target instanceof window.HTMLElement || target instanceof window.NodeList) {
			isDOM = true
			if (target instanceof window.NodeList) {
				input = [...target]
			}
		}
		const targets = this._setTargets(input)
		const timings = this._setTimings(targets, optionsObject)

		const actors = []
		targets.forEach(target => {
			actors.push(new Actor(target, properties, 'removeClass', isDOM))
		})

		this._animate(actors, timings, optionsObject)
	}

	static _animate(actors, timings, options) {
		function update(currentTime) {
			const elapsedTime = (currentTime - startTime) - timings.delay
			const progress = Math.min(elapsedTime / timings.totalDuration, 1)

			actors.forEach((actor, index) => {
				const staggeredProgress = Math.min((elapsedTime - (timings.stagger * index)) / timings.duration, 1)
				if (staggeredProgress > 0) {
					const latest = timings.easing(staggeredProgress)
					actor.update(latest)
				}
			})

			if (progress < 1) {
				if (options.onUpdate) {
					options.onUpdate()
				}
				requestAnimationFrame(update)
			} else {
				actors.forEach(actor => {
					actor.update(1)
				})
				if (options.onComplete) {
					options.onComplete()
				}
			}
		}

		if (options.onStart) {
			options.onStart()
		}
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

		timings.duration = options.duration ? (options.duration * timeScale) : 1
		timings.delay = options.delay ? (options.delay * timeScale) : 0
		timings.stagger = options.stagger ? (options.stagger * timeScale) : 0
		timings.totalDuration = timings.duration + ((targets.length - 1) * timings.stagger)
		timings.easing = Eases.get(options.ease)

		return timings
	}
}

Director.Scene = Scene
Director.Camera = Camera