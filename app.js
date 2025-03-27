const express = require('express');
const app = express();
require('dotenv').config();
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
// const pgSession = require('connect-pg-simple')(session);
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const assetsPath = path.join(__dirname, 'public');
const session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter)
app.use('/balli', indexRouter)

app.listen(process.env.PORT, () =>{
    console.log(`Listening on port ${process.env.PORT}` )
})