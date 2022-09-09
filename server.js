if(process.env.NODE_ENV!== "production"){
    require("dotenv").config()
}
// Importing libraries that we installed using npm
const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes/login');
const bodyParser = require('body-parser');
const flash = require('express-flash');



const app = express();
// body-parser middleware
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(flash());

// Setting up the view engine
app.set('view engine', 'ejs');

//Setting up static folder
app.use(express.static(path.join(__dirname,"public")));

app.use('/', router);


const port = process.env.port || 3000;

app.listen(port, ()=>console.log(`Server listening on port: ${port}`));