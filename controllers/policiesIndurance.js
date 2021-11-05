const axios = require('axios');


async function getPoliciesIndurance() {
    const url = `${process.env.SERVICE_URL}/policies`;
        
    try {
        const policies = await axios.get(url,{headers: {Authorization: process.env.TOKEN_INSURANCE}});
        return policies.data;
    } catch (error) {
        throw error.response.data;
    }
}

module.exports = {
    getPoliciesIndurance
}