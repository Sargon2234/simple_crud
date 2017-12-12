const express = require('express'),
    bodyParser = require('body-parser'),
    Sequalize = require('sequelize'),
    expressValidator = require('express-validator'),
    staticFolder = './static/',
    multer = require('multer'),
    fileHelper = require('./additionalHelpers/FileHandler'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config.json')[env],
    routes = require('./Routes/mainRoutes');

const app = express();

const connection = new Sequalize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

connection
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/static', express.static(staticFolder));

const upload = multer({
  storage: fileHelper.storage(multer, staticFolder),
  limits: {
    // Max file size 5 MB
    fileSize: 5242880
  },
  fileFilter: fileHelper.fileFilter,
});

routes(app, upload);

app.listen(config.app.port, () => {
  console.log('App started!', config.app.port);
});