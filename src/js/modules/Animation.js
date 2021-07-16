export default class Animation {
	constructor(target, properties, options) {
		this.target = target
		this.properties = properties
		this.options = options

		this.propertyDeltas = []
		
		for (const property in this.properties) {
			this.propertyDeltas[property] = {
				start: this.target[property],
				delta: this.properties[property] - this.target[property]
			}
		}
	}

	update(progress) {
		for (const property in this.properties) {
			this.target[property] = this.propertyDeltas[property].start + progress * this.propertyDeltas[property].delta
		}
	}
}