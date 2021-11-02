const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv').config({path: '.env'});;

//set env variables
dotEnv.config();
const port = process.env.PORT || 3000;

//cors
app.use(cors());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//check if response 
app.get('/ping',(req,res) => {
    res.status(200).send('pong');
});

app.listen(port, () => {
    console.log(`API REST running in http://localhost:${port}`);
});