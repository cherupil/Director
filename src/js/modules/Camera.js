export default class Camera {
	constructor(element, scene, options = {}) {
		this.element = element
		this.scene = scene
		this.options = options
		this._init()
	}

	_init() {
		this.observer = null
		this.progress = 0

		this.scrollDistance = 0
		this.scrollPosition = 0

		this.element.parentElement.style.height = 'auto'
		this.viewportHeight = window.innerHeight

		this.isIntersecting = false

		if (this.options.pinned) {
			this.offset = this.element.parentElement.offsetTop
			this.offset += this.options.beginOnIntersection ? -this.element.parentElement.offsetHeight : 0
			this.scrollHeight = this.scene.duration
			this._setScrollHeight()
			this.scrollHeight += this.options.offset ? this.options.offset : 0
		} else {
			this.offset = window.pageYOffset + this.element.getBoundingClientRect().top - this.viewportHeight
			this.scrollHeight = this.viewportHeight + this.element.offsetHeight
		}
		this._scrollListener = this._scrollListener.bind(this)

		this._createObserver()
	}

	resize() {
		this.viewportHeight = window.innerHeight
		if (this.options.pinned) {
			this.offset = this.element.parentElement.offsetTop
			this.offset += this.options.beginOnIntersection ? -this.element.parentElement.offsetHeight : 0
			this.scrollHeight = this.scene.duration
			this._setScrollHeight()
			this.scrollHeight += this.options.offset ? this.options.offset : 0
		} else {
			this.offset = window.pageYOffset + this.element.getBoundingClientRect().top - this.viewportHeight
			this.scrollHeight = this.viewportHeight + this.element.offsetHeight
		}
	}

	setScene(scene) {
		this.scene = scene
		this._init()
	}

	_setScrollHeight() {
		const totalHeight = this.scrollHeight + (this.options.beginOnIntersection ? 0 : this.viewportHeight)
		this.element.parentElement.style.height = `${(totalHeight / this.viewportHeight) * 100}vh`
	}

	_scrollListener(event) {
		this.scrollDistance = event.target.scrollingElement.scrollTop
		this.scrollPosition = this.scrollDistance - this.offset
		this.progress = Math.min(Math.max(this.scrollPosition / this.scrollHeight, 0), 1)
	}

	_createObserver() {
		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.isIntersecting = true
					window.addEventListener('scroll', this._scrollListener)
				} else {
					this.isIntersecting = false
					window.removeEventListener('scroll', this._scrollListener)
					this.progress = Math.round(this.progress)
				}
			})
		}, { threshold: this.options.threshold ? this.options.threshold : 0 })

		this.observer.observe(this.element)
	}
}