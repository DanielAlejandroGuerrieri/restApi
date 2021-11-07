const auth = require('../../middlewares/auth');

describe('Middleware auth', () => {
    it('should have a login function', () => {
        expect(typeof auth.loginUser).toBe('function');
    });
    it('should have a validateToken function', () => {
        expect(typeof auth.validateToken).toBe('function');
    })
});