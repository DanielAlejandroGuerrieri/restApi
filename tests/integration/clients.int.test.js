const request = require('supertest');
const app = require('../../app');

const endpointUrl = '/auth/clients';

jest.setTimeout(10000);

const notAuth = require('../mocks/notAuth');

describe(endpointUrl, () => {
    it('GET' + endpointUrl + ' without authorization', async () => {
        const response = await request(app)
            .get(endpointUrl)
            .send();
        const errorNotAuth = JSON.stringify(notAuth);

        expect(response.statusCode).toBe(401);
        expect(response.error.text).toBe(errorNotAuth);
    });

    it('GET' + endpointUrl + ' with authorization', async () => {
        const loginUrl = '/login';

        const body = {
            username: 'Britney',
            password: 's3cr3t'
        };

        const login = await request(app)
            .post(loginUrl)
            .send(body);

        const response = await request(app)
            .get(endpointUrl)
            .set('Authorization', `${login.body.type} ${login.body.token}`)
            .send();

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
    })
});