const getPoliciesByClientId = require('../../controllers/getPoliciesByClientId').getPolicieById;
const { clientsMock} = require('../mocks/clientsMock');
const { policiesMock } = require('../mocks/policiesMock');

describe('getPoliciesByClientId.controller', () => {

    it('should have a getPolicie function', () => {
        expect(typeof getPoliciesByClientId).toBe('function');
    });

    it('Should have policies by clientId', () => {
        const clientMock = {
            id: '1',
            name: 'Britney',
            role: 'admin',
            email: 'britney@api.com'
        }

        const shortPolicies = [{
            id: '1',
            amountInsured: 'string',
            inceptionDate: 'string'
        },
        {
            id: '3',
            amountInsured: 'string',
            inceptionDate: 'string'
        }];

        const completePolicies = [{
            id: '1',
            amountInsured: 'string',
            inceptionDate: 'string',
            email: 'string',
            installmentPayment: true,
            clientId: '1'

        },
        {
            id: '3',
            amountInsured: 'string',
            inceptionDate: 'string',
            email: 'string',
            installmentPayment: false,
            clientId: '1'
        }];

        //type of result
        expect(typeof getPoliciesByClientId(clientMock, policiesMock)).toBe('object');
        //Should the result to be like the short policies values
        expect(getPoliciesByClientId(clientMock, policiesMock)).toEqual(shortPolicies);
        //should the result to be like in the complete policies values
        expect(getPoliciesByClientId(clientMock, policiesMock, false)).toEqual(completePolicies)

    });
});