const express = require('express');

const routes = require('./routes');

const mongoose = require('mongoose');

const bodyParser = require('body-parser')

//"cors" para intercambiar info con react
const cors = require('cors')

mongoose.set('strictQuery', true);

//conexion de mongoose

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/restapi', {
    useNewUrlParser: true
});

//crear el servidor
const app = express();

//habilitar bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//habilitar cors
app.use(cors());

//rutas app

app.use('/', routes());


//puerto
app.listen(5000);