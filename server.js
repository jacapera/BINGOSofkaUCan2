const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv').config()

const app = express();

//Conexion a mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO,
  {
    useNewUrlParser: true
  }
);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use('/api', routes());

//Routes
app.get('/', (req, res) => {
  res.send('<h1>' + 'Hola, bienvenido...estas en mi servidor con mongodb' + '</h1>');
});

//Servidor escuchando
const PUERTO = process.env.PORT;
app.listen(PUERTO, () => {
    console.log(`Server listening on port ${PUERTO}`);
});