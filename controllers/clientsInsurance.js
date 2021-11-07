const axios = require('axios');


async function getClientsInsurance() {
    const url = `${process.env.SERVICE_URL}/clients`;

    try {
        const clients = await axios.get(url, { headers: { Authorization: process.env.TOKEN_INSURANCE } });
        return clients.data;
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Error to get data from Insurance' };
    }
}

module.exports = {
    getClientsInsurance
}