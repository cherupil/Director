export default class Eases {
	static get(key) {
		switch (key) {
			case 'linear':
				return this._easeLinear
			case 'easeOut':
				return this._easeOutQuad
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

	static _easeLinear(t, b, c, d) {
		return c * t / d + b
	}

	static _easeOutQuad(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b
	}

	static _easeOutExpo(t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
	}

	static _easeOutSpring(t, b, c, d) {
		let s = 1.70158
		let p = 0
		let a = c
		if (t == 0) return b
		if ((t /= d) == 1) return b + c
		if (!p) p = d * .3
		if (a < Math.abs(c)) {
			a = c 
			s = p / 4 
		} else {
			s = p / (2 * Math.PI) * Math.asin(c / a)
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
	}

	static _easeOutBack(t, b, c, d) {
		const s = 1.70158
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
	}
}