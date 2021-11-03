const axios = require('axios');


async function getClientsIndurance(token) {
    const url = `${process.env.SERVICE_URL}/clients`;
        
    try {
        const clients = await axios.get(url,{headers: {Authorization: token}});
        return clients.data;
    } catch (error) {
        throw error.response.data;
    }
}

module.exports = {
    getClientsIndurance
}