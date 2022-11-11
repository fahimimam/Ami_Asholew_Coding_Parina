const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport'); 
const app = express();
require('./config/passport')(passport);

/**
 * ! DB Configure
 */

const db = require('./config/keys').MongoURI;

/**
 * ! Connect To Mongo
 */

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

/**
 * ! EJS
 */

app.use(expressLayouts);
app.set('view engine', 'ejs');

/**
 * ! Body Parser
 */

app.use(express.urlencoded({extended: false}));

/**
 * ! Routes
 */

 app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

app.use(passport.initialize());
app.use(passport.session());


/**
 * ! Routes
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on Port ${PORT}`))