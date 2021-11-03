const axios = require('axios');


async function getPoliciesIndurance(token) {
    const url = `${process.env.SERVICE_URL}/policies`;
        
    try {
        const policies = await axios.get(url,{headers: {Authorization: token}});
        return policies.data;
    } catch (error) {
        throw error.response.data;
    }
}

module.exports = {
    getPoliciesIndurance
}