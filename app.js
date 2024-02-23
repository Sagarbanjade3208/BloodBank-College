const express = require('express');
const UserRoute = require('./Routes/UserRoutes');
const BloodRoute = require('./Routes/BloodRoute');
const ErrorHandler = require('./Utils/ErrorHandler');
const documentRoute = require('./Routes/DocumentRoute');
const path = require('path');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', UserRoute);
app.use('/api/v1/blood', BloodRoute);
app.use('/', documentRoute);

app.use('*', (request, response) => {
  response.send('Route not found on this server');
});
app.use(ErrorHandler);

module.exports = app;
