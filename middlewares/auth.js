const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
dotEnv.config();

const { getClientsInsurance } = require('../controllers/clientsInsurance');
const { getTokenInsurance } = require('../controllers/login');

//Login de usuario y obtención de token
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw { status: 400, message: 'Username and password are required' }
        }

        const tokenInsurance = await getTokenInsurance();

        process.env.TOKEN_INSURANCE = `${tokenInsurance.type} ${tokenInsurance.token}`;

        const clients = await getClientsInsurance(process.env.TOKEN_INSURANCE);
        
        if (!clients) {
            throw { status: 500, message: 'Fail to get token' };
        }

        const client = clients.find(el => el.name == username);  
        
        if (!client || password != process.env.CLIENT_SECRET) {
            throw { status: 401, message: 'Invalid username or password' }
        }

        const payload = { username, password, role: client.role };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({
            token,
            type: 'Bearer',
            expires_in: 3600
        });

    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message });
    }
}

//autorizacion de usuario
function validateToken(req, res, next) {
    try {
        if (!process.env.TOKEN_INSURANCE) {
            throw { status: 401, message: 'No Authorization header was found' }
        }

        if (!req.headers.authorization) {
            throw { status: 400, message: 'Token are required' };
        } else {
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.SECRET_KEY, (error, authData) => {
                if (error) {
                    throw { status: 401, message: 'Unathorized token' }
                } else {
                    const { username, role } = authData;
                    req.body = { username, role };
                    next();
                }
            });
        }
    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message });
    }

}



module.exports = {
    validateToken,
    loginUser
};