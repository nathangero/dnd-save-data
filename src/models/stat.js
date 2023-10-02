export default class Stat {

    constructor(value = 0) {
        this.value = value
    }

    calculateMod() {
        return Math.floor((this.value - 10) / 2)
    }
}