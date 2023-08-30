export default class Hp {
    constructor(
        current = 0,
        die = '',
        dieAmountCurrent = 0,
        dieAmountMax = 0,
        max = 0,
        temp = 0
    ) {
        this.current = current
        this.die = die
        this.dieAmountCurrent = dieAmountCurrent
        this.dieAmountMax = dieAmountMax
        this.max = max
        this.temp = temp
    }
}