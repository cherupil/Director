export default class Animation {
	constructor(target, properties, direction) {
		this.target = target
		this.properties = properties
		this.direction = direction

		this.propertyDeltas = []

		this.setProperties()
	}

	setProperties() {
		switch (this.direction) {
			case 'to':
				for (const property in this.properties) {
					this.propertyDeltas[property] = {
						start: this.target[property],
						delta: this.properties[property] - this.target[property]
					}
				}
				break;
			case 'from':
				for (const property in this.properties) {
					this.propertyDeltas[property] = {
						start: this.properties[property],
						delta: this.target[property] - this.properties[property]
					}
				}
				break;
			default:
				break;
		}
	}

	update(progress) {
		for (const property in this.properties) {
			this.target[property] = this.propertyDeltas[property].start + progress * this.propertyDeltas[property].delta
		}
	}
}