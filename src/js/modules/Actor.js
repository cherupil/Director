import Utilities from './Utilities.js'
import Action from './Action.js'

export default class Actor {
	constructor(target, properties, direction, isDOM) {
		this.target = target
		this.properties = properties
		this.direction = direction
		this.isDOM = isDOM
		this.unitExpression = /[a-z]+|%/
		this.hasTransform = false
		this.transformPropertyKeys = ['translateX', 'translateY', 'rotate', 'scale', 'scaleX', 'scaleY']
		this.transformMatrix = {}
		if (this.isDOM) {
			this.bounds = this.target.getBoundingClientRect()
		}

		this.setProperties()
	}

	_getTransformMatrix(matrix) {
		if (matrix === 'none' || matrix === undefined) {
			return {
				translateX: 0,
				translateY: 0,
				scaleX: 1,
				scaleY: 1,
				rotate: 0
			}
		}

		this.transformType = matrix.includes('3d') ? '3d' : '2d'
		const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

		if (this.transformType === '2d') {
			return {
				translateX: values[4],
				translateY: values[5],
				scaleX: values[0],
				scaleY: values[3],
				rotate: Math.atan2(values[1], values[0]) * (180/Math.PI)
			}
		}
	}

	_getTransformPercentage(property, value) {
		if (property === 'translateX') {
			return value *= (this.bounds.width / 100)
		} else {
			return value *= (this.bounds.height /100)
		}
	}

	setProperties() {
		this.actions = []
		if (this.isDOM) {
			const style = getComputedStyle(this.target)
			this.transformMatrix = this._getTransformMatrix(style['transform'])
			for (const property in this.properties) {
				if (this.transformPropertyKeys.includes(property)) {
					this.hasTransform = true
					if (property === 'scale') {
						if (this.direction === 'fromTo') {
							this.actions.push(new Action(this.transformMatrix, 'scaleX', this.properties['scale'][1], this.properties['scale'][0], null, this.direction))
							this.actions.push(new Action(this.transformMatrix, 'scaleY', this.properties['scale'][1], this.properties['scale'][0], null, this.direction))
						} else {
							this.actions.push(new Action(this.transformMatrix, 'scaleX', this.properties['scale'], parseFloat(this.transformMatrix['scaleX']), null, this.direction))
							this.actions.push(new Action(this.transformMatrix, 'scaleY', this.properties['scale'], parseFloat(this.transformMatrix['scaleY']), null, this.direction))
						}
					} else if (((property === 'translateX') || (property === 'translateY')) && this.isDOM) {
						if (this.direction === 'fromTo') {
							const targetValue = this._getTransformPercentage(property, this.properties[property][1])
							const startValue = this._getTransformPercentage(property, this.properties[property][0])
							this.actions.push(new Action(this.transformMatrix, property, targetValue, startValue, null, this.direction))
						} else {
							let value = this._getTransformPercentage(property, this.properties[property])
							this.actions.push(new Action(this.transformMatrix, property, value, parseFloat(this.transformMatrix[property]), null, this.direction))
						}
					} else {
						if (this.direction === 'fromTo') {
							this.actions.push(new Action(this.transformMatrix, property, this.properties[property][1], this.properties[property][0], null, this.direction))
						} else {
							this.actions.push(new Action(this.transformMatrix, property, this.properties[property], parseFloat(this.transformMatrix[property]), null, this.direction))
						}
					}
				} else {
					if (property !== 'class') {
						if (this.direction === 'fromTo') {
							this.actions.push(new Action(this.target.style, property, this.properties[property][1], this.properties[property][0], null, this.direction))
						} else {
							const units = this.unitExpression.exec(style[property])
							const value = parseFloat(style[property].split(units)[0])

							this.actions.push(new Action(this.target.style, property, this.properties[property], value, units, this.direction))
						}
					} else {
						this.actions.push(new Action(this.target, property, this.properties[property], null, null, this.direction))
					}
				}
			}
		} else {
			for (const property in this.properties) {
				if (this.direction === 'fromTo') {
					this.actions.push(new Action(this.target, property, this.properties[property][1], this.properties[property][0], null, this.direction))
				} else {
					this.actions.push(new Action(this.target, property, this.properties[property], this.target[property], null, this.direction))
				}
			}
		}

		for (const action of this.actions) {
			action.setProperties()
		}
	}

	update(progress) {
		for (const action of this.actions) {
			action.update(progress)
		}

		if (this.hasTransform) {
			const compositeMatrix = Utilities.multiply2DMatricies(
										Utilities.multiply2DMatricies(
											Utilities.scale2D(this.transformMatrix.scaleX, this.transformMatrix.scaleY), 
											Utilities.rotate2D(this.transformMatrix.rotate * (Math.PI / 180))), 
										Utilities.translate2D(this.transformMatrix.translateX, this.transformMatrix.translateY)
									)
			this.target.style.transform = `matrix(${compositeMatrix[0]}, ${compositeMatrix[3]}, ${compositeMatrix[1]}, ${compositeMatrix[4]}, ${compositeMatrix[2]}, ${compositeMatrix[5]})`
		}
	}
}