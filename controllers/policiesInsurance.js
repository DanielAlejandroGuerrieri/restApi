const axios = require('axios');


async function getPoliciesInsurance() {
    const url = `${process.env.SERVICE_URL}/policies`;

    try {
        const policies = await axios.get(url, { headers: { Authorization: process.env.TOKEN_INSURANCE } });
        return policies.data;
    } catch (error) {
        console.error(error);
        throw { status: 500, message: 'Error to get data from Insurance' };
    }
}

module.exports = {
    getPoliciesInsurance
}