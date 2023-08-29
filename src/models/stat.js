export default class Stat {

    constructor(value = '') {
        this.value = value
    }

    calculateMod() {
        return Math.floor((this.value - 10) / 2)
    }
}