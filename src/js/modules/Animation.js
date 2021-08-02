export default class Animation {
	constructor(target, properties, direction, isDOM) {
		this.target = target
		this.properties = properties
		this.direction = direction
		this.isDOM = isDOM
		this.unitExpression = /[a-z]+|%/

		if (isDOM) {
			this.style = getComputedStyle(this.target)
			this.DOMPropertyDeltas = {}
			this.setDOMProperties()
		} else {
			this.propertyDeltas = {}
			this.setProperties()
		}
	}

	setDOMProperties() {
		switch (this.direction) {
			case 'to':
				for (const property in this.properties) {
					const units = this.unitExpression.exec(this.style[property])
					const value = parseFloat(this.style[property].split(units)[0])
					this.DOMPropertyDeltas[property] = {
						start: value,
						delta: this.properties[property] - value,
						units
					}
				}
				break
			case 'from':
				for (const property in this.properties) {
					const units = this.unitExpression.exec(this.style[property])
					const value = parseFloat(this.style[property].split(units)[0])
					this.DOMPropertyDeltas[property] = {
						start: this.properties[property],
						delta: value - this.properties[property],
						units
					}
				}
				break
			default:
				break
		}
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
				break
			case 'from':
				for (const property in this.properties) {
					this.propertyDeltas[property] = {
						start: this.properties[property],
						delta: this.target[property] - this.properties[property]
					}
				}
				break
			default:
				break
		}
	}

	update(progress) {
		if (this.isDOM) {
			for (const property in this.properties) {
				this.target.style[property] = (this.DOMPropertyDeltas[property].start + progress * this.DOMPropertyDeltas[property].delta) + this.DOMPropertyDeltas[property].units
			}
		} else {
			for (const property in this.properties) {
				this.target[property] = this.propertyDeltas[property].start + progress * this.propertyDeltas[property].delta
			}
		}
	}
}