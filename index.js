// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const courses = require('./routes/courses')
const home = require('./routes/home')

const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./auth');
const app = express();
const Joi = require('joi'); // this is class

app.set('view engine', 'pug');
app.set('views', './views'); // put the template in this views folder, but this is default

// process.env.NODE_EVN // default is undefined
console.log(`NODE_ENV: ${process.env.NODE_EVN}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Logging function, need to add next inorder to pass it to other middleware function.
app.use(logger);
app.use(auth);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Sever: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));



if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    // startupDebgger('morgan enabled...')
}

// Db work...
// dbDebugger('Connected to the database....');




// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});