const express = require('express');
const app = express();

const cors = require('cors');
const dotEnv = require('dotenv');

const auth = require('./middlewares/auth');

const routes = require('./routes/router');

//set env variables
dotEnv.config();
const port = process.env.PORT || 3000;

//cors
app.use(cors());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', auth.validateToken);

//check if API its alive
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});


app.post('/login', auth.loginUser);


//Routes
app.use('/auth', routes)


app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
});

module.exports = app;