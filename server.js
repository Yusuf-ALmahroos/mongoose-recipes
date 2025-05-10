const express        = require('express');
const logger         = require('morgan');
const methodOverride = require('method-override');
const session        = require('express-session');
const db             = require('./db');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Connected ...');
})

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`litening to port: ${PORT}`);
})