export default class Action {
	constructor(target, property, targetValue, currentValue, units, direction) {
		this.target = target
		this.property = property
		this.targetValue = targetValue
		this.currentValue = currentValue
		this.units = units
		this.direction = direction

		this.propertyDelta = {}

		this.setProperties()
	}

	setProperties() {
		switch (this.direction) {
			case 'to':
				this.propertyDelta = {
					start: this.currentValue,
					delta: this.targetValue - this.currentValue
				}
				break
			case 'from':
				this.propertyDelta = {
					start: this.targetValue,
					delta: this.currentValue - this.targetValue
				}
				break
			case 'fromTo':
				this.propertyDelta = {
					start: this.currentValue,
					delta: this.targetValue - this.currentValue
				}
				break
			case 'addClass':
				this.classFunction = () => {
					this.target.classList.add(this.targetValue)
				}
				break
			case 'removeClass':
				this.classFunction = () => {
					this.target.classList.remove(this.targetValue)
				}
				break
			default:
				break
		}
	}

	update(progress) {
		if (this.property !== 'class') {
			this.target[this.property] = (this.propertyDelta.start + progress * this.propertyDelta.delta) + this.units
		} else {
			if (progress === 0) {
				if (this.direction === 'addClass') {
					this.target.classList.remove(this.targetValue)
				} else {
					this.target.classList.add(this.targetValue)
				}
			}
			if (progress === 1) {
				this.classFunction()
			}
		}
	}
}