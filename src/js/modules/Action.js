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
			default:
				break
		}
	}

	update(progress) {
		this.target[this.property] = (this.propertyDelta.start + progress * this.propertyDelta.delta) + this.units
	}
}