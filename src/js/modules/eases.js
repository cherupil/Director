export default class Eases {
	static get(key) {
		switch (key) {
			case 'linear':
				return this._easeLinear
			case 'easeOut':
				return this._easeOutSine
			case 'easeOutExpo':
				return this._easeOutExpo
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

	static _easeOutSine(p) {
		return Math.sin(p * (Math.PI / 2))
	}

	static _easeOutExpo(p) {
		return 1 - Math.pow(2, -10 * p)
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