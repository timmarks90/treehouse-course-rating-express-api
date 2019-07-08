// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('../routes');
const bodyParser = require("body-parser");

const app = express();

// connect to mongo db
mongoose.connect("mongodb://localhost:27017/course-api", { useNewUrlParser: true });

// Connection to mongo db
const db = mongoose.connection;

db.on("error", err => {
  console.error("Connection error:", err);
});

db.once("open", () => {
  console.log("db connection successful");
});

app.use(bodyParser.json());

// morgan gives us http request logging
app.use(morgan('dev'));

// connect routes with api home route
app.use('/api', routes);

// set our port
app.set('port', process.env.PORT || 5000);

// TODO add additional routes here

// send a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
