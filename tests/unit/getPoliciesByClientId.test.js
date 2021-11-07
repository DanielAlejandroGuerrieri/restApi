const getPoliciesByClientId = require('../../controllers/getPoliciesByClientId').getPolicieById;


describe('getPoliciesByClientId.controller', () => {
    
    it('should have a getPolicie function', () => {
        expect(typeof getPoliciesByClientId).toBe('function');
    });

    it('should get one policie by clientId', () => {
        const clientMock = {
            id: 1, 
            name: 'Britney',
        };

        expect(getPoliciesByClientId(clientMock)).toBe();
    });
});