import { randomInt } from 'mathjs'

const roulette = [ (0, 'green'), (1, 'red'), (2, 'black'), (3, 'red'), (4, 'black'), (5, 'red'), (6, 'black'), (7, 'red'), (8, 'black'), (9, 'red'), (10, 'black'), (11, 'black'), (12, 'red'), (13, 'black'), (14, 'red'), (15, 'black'), (16, 'red'), (17, 'black'), (18, 'red'), (19, 'red'), (20, 'black'), (21, 'red'), (22, 'black'), (23, 'red'), (24, 'black'), (25, 'red'), (26, 'black'), (27, 'red'), (28, 'black'), (29, 'black'), (30, 'red'), (31, 'black'), (32, 'red'), (33, 'black'), (34, 'red'), (35, 'black'), (36, 'red'), ]

export default class Montecarlo {
    constructor(initialAmount, bet, betAmount, numBet, simulations) {
        this.initialAmount = initialAmount
        this.bet = bet
        this.betAmount = betAmount
        this.numBet = numBet
        this.simulations = simulations
    }

    simulate() {

        let results = []
        let plotData = []

        for (let i = 0; i < this.simulations; i++) {
            let amount = this.initialAmount
            let amountPlot = []

            for (let x = 0; x < this.numBet; x++) {
                let result = roulette[randomInt(0, 37)]

                amount = amount + this.betAmount * (result == this.bet ? 1 : -1)
                
                amountPlot.push(amount)
            }

            plotData.push({name: `Simulacion ${i}`, data: amountPlot})
            results.push(amount)

        }

        const average = results.reduce((a, b) => a + b, 0) / results.length

        return { average: average, data: plotData, results }
    }

    gameEdge(){
        let win_probability = 18/37;
        let loss_probability = 1 - win_probability;
        let payoff_win = 1;

        let expected_value = (payoff_win * win_probability) - (1 * loss_probability);
        let house_edge = -expected_value * 100;
        house_edge = house_edge.toFixed(2);

        return house_edge;
    }
}