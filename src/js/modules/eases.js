export default class Eases {
	static get(key) {
		switch (key) {
			case 'linear':
				return this._easeLinear
			case 'easeInSine':
				return this._easeInSine
			case 'easeOutSine':
				return this._easeOutSine
			case 'easeInOutSine':
				return this._easeInOutSine
			case 'easeInQuad':
				return this._easeInQuad
			case 'easeOutQuad':
				return this._easeOutQuad
			case 'easeInOutQuad':
				return this._easeInOutQuad
			case 'easeInCubic':
				return this._easeInCubic
			case 'easeOutCubic':
				return this._easeOutCubic
			case 'easeInOutCubic':
				return this._easeInOutCubic
			case 'easeInQuart':
				return this._easeInQuartic
			case 'easeOutQuart':
				return this._easeOutQuartic
			case 'easeInOutQuart':
				return this._easeInOutQuartic
			case 'easeInQuint':
				return this._easeInQuintic
			case 'easeOutQuint':
				return this._easeOutQuintic
			case 'easeInOutQuint':
				return this._easeInOutQuintic
			case 'easeInExpo':
				return this._easeInExpo
			case 'easeOutExpo':
				return this._easeOutExpo
			case 'easeInOutExpo':
				return this._easeInOutExpo
			case 'easeOutSpring':
				return this._easeOutSpring
			case 'easeOutBack':
				return this._easeOutBack
			default:
				return this._easeLinear
		}
	}

	static _easeLinear(p) {
		return p
	}

	static _easeInSine(p) {
		return - Math.cos(p * (Math.PI / 2)) + 1
	}

	static _easeOutSine(p) {
		return Math.sin(p * (Math.PI / 2))
	}

	static _easeInOutSine(p) {
		return -0.5 * (Math.cos(Math.PI * p) - 1)
	}

	static _easeInQuad(p) {
		return p ** 2
	}

	static _easeOutQuad(p) {
		return 1 - (1 - p) ** 2
	}

	static _easeInOutQuad(p) {
		return p < .5 ? (p * 2) ** 2 / 2 : 1 - ((1 - p) * 2) ** 2 / 2
	}

	static _easeInCubic(p) {
		return p ** 3
	}

	static _easeOutCubic(p) {
		return 1 - (1 - p) ** 3
	}

	static _easeInOutCubic(p) {
		return p < .5 ? (p * 2) ** 3 / 2 : 1 - ((1 - p) * 2) ** 3 / 2
	}

	static _easeInQuartic(p) {
		return p ** 4
	}

	static _easeOutQuartic(p) {
		return 1 - (1 - p) ** 4
	}

	static _easeInOutQuartic(p) {
		return p < .5 ? (p * 2) ** 4 / 2 : 1 - ((1 - p) * 2) ** 4 / 2
	}

	static _easeInQuintic(p) {
		return p ** 5
	}

	static _easeOutQuintic(p) {
		return 1 - (1 - p) ** 5
	}

	static _easeInOutQuintic(p) {
		return p < .5 ? (p * 2) ** 5 / 2 : 1 - ((1 - p) * 2) ** 5 / 2
	}

	static _easeInExpo(p) {
		return Math.pow(2, 10 * (p - 1)) - 0.001
	}

	static _easeOutExpo(p) {
		return 1 - Math.pow(2, -10 * p)
	}

	static _easeInOutExpo(p) {
		return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)))
	}

	static _easeOutSpring(p) {
		const p1 = 1
		const p2 = 0.3
		const p3 = p2 / (Math.PI * 2) * (Math.asin(1 / p1) || 0)
		return p1 * Math.pow(2, -10 * p) * Math.sin( (p - p3) * (Math.PI * 2) / p2 ) + 1
	}

	static _easeOutBack(p) {
		const p1 = 1.70158
		return ((p = p - 1) * p * ((p1 + 1) * p + p1) + 1)
	}
}