const express        = require('express');
const logger         = require('morgan');
const methodOverride = require('method-override');
const session        = require('express-session');
const db             = require('./db');

const authRouter   = require('./routes/authRouter.js');
const recipeRouter = require('./routes/recipeRouter.js');
const userRouter   = require('./routes/userRouter.js')

require('dotenv').config();

const app = express();
app.use(express.static('public'))

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index.ejs')
})

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`litening to port: ${PORT}`);
})

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/recipe', recipeRouter);