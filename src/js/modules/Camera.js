export default class Camera {
	constructor(element, scene, options = {}) {
		this.element = element
		this.scene = scene
		this.options = options

		this.observer = null
		this.progress = 0

		this.scrollDistance = 0
		this.scrollPosition = 0

		if (this.options.pinned) {
			this.offset = this.element.parentElement.offsetTop
			this.scrollHeight = this.scene.duration
			this._scrollListener = this._pinnedScrollListener.bind(this)
			this._setScrollHeight()
			this.scrollHeight += this.options.offset ? this.options.offset : 0
		} else {
			this.offset = this.element.offsetTop
			this.viewportHeight = window.innerHeight
			this.scrollHeight = this.element.getBoundingClientRect().height + this.offset
			this._scrollListener = this._defaultScrollListener.bind(this)
		}

		this._createObserver()
	}

	_setScrollHeight() {
		this.element.parentElement.style.height = `${this.scrollHeight + window.innerHeight}px`
	}

	_defaultScrollListener(event) {
		this.scrollDistance = event.target.scrollingElement.scrollTop
		this.scrollPosition = (this.scrollDistance + this.viewportHeight) - this.offset
		this.progress = Math.min(Math.max(this.scrollPosition / this.scrollHeight, 0), 1)
	}

	_pinnedScrollListener(event) {
		this.scrollDistance = event.target.scrollingElement.scrollTop
		this.scrollPosition = this.scrollDistance - this.offset
		this.progress = Math.min(Math.max(this.scrollPosition / this.scrollHeight, 0), 1)
	}

	_createObserver() {
		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					window.addEventListener('scroll', this._scrollListener)
				} else {
					window.removeEventListener('scroll', this._scrollListener)
					this.progress = Math.round(this.progress)
				}
			})
		}, { threshold: 0 })

		this.observer.observe(this.element)
	}
}