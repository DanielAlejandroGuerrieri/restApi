const auth = require('../../middlewares/auth');
const httpMocks = require('node-mocks-http');

let { getClientsInsurance } = require('../../controllers/clientsInsurance');
let { getTokenInsurance } = require('../../controllers/login');
getTokenInsurance = jest.fn();
getClientsInsurance = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('Middleware auth', () => {
    it('should have a login function', () => {
        expect(typeof auth.loginUser).toBe('function');
    });

    it('should have a validateToken function', () => {
        expect(typeof auth.validateToken).toBe('function');
    });

    // it('should call getTokenInsurance and get Bearer token', async () => {
    //     req.body = { username: 'Britney', password: 's3cr3t'};
    //     auth.loginUser(req,res);
    //     getTokenInsurance.mockReturnValueOnce('Bearer aspodpoajskdlkajlkdlk.jgiaisuriuirtjbkbmv.spdf7654652315646');
    //     const tokenInsurance = await getTokenInsurance();
    //     expect(getTokenInsurance).toBeCalled();
    //     expect(tokenInsurance).toMatch(/Bearer/);
    // });

    
});