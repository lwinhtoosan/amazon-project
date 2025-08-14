import { formatCurrency } from '../../scripts/utils/money.js'

describe('test suite: format currency test', () => {
    it('work with normal', () => {
        expect(formatCurrency(2089)).toEqual('20.89')
    });

    it('work with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00')
    });

    it('work with round up to nearest', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })

    it('work with round number', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00')
    })

    it('work with negative number', () => {
        expect(formatCurrency(-1234)).toEqual('-12.34')
    })
})