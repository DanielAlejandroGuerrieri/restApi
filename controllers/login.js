const axios = require('axios');
const dotEnv = require('dotenv');
dotEnv.config();


async function getTokenInsurance() {
    const b2bTokenUrl = `${process.env.SERVICE_URL}/login`;
    const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    };

    try {
        const token = await axios.post(b2bTokenUrl, data);
        return token.data;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getTokenInsurance
};