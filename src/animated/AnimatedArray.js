import Animated from './Animated'
import AnimatedValue from './AnimatedValue'
import AnimatedWithChildren from './AnimatedWithChildren'

export default class extends AnimatedWithChildren {
    constructor(array) {
        super()
        this._values = array.map(n => new AnimatedValue(n))
    }

    setValue(values) {
        values.forEach((n, i) => this._values[i].setValue(n))
    }

    setOffset(values) {
        values.forEach((n, i) => this._values[i].setOffset(n))
    }

    flattenOffset() {
        this._values.forEach(v => v.flattenOffset())
    }

    __getValue() {
        return this._values.map(v => v.__getValue())
    }

    stopAnimation(callback) {
        this._values.forEach(v => v.stopAnimation())
        callback && callback(this.__getValue())
    }

    __attach() {
        for (let i = 0; i < this._values.length; ++i)
            if (this._values[i] instanceof Animated) this._values[i].__addChild(this)
    }

    __detach() {
        for (let i = 0; i < this._values.length; ++i)
            if (this._values[i] instanceof Animated) this._values[i].__removeChild(this)
    }
}
