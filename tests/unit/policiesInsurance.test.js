const { getPoliciesInsurance } = require('../../controllers/policiesInsurance');
const axios = require('axios');
const { policiesMock } = require('../mocks/policiesMock');

jest.mock('axios');

describe('Test getPoliciesInsurance with a mock values', () => {
    test('Should get the policies from Insurance', async () => {
        
        axios.get.mockResolvedValue({data: policiesMock});
        const data = await getPoliciesInsurance();

        expect(typeof data).toEqual('object');
        expect(data).toBe(policiesMock);
    });    
});