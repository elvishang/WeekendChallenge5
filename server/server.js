var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 5000;
var forRent = require('./routers/forRent-router.js');
var forSale = require('./routers/forSale-router.js');

app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/forRent', forRent)
app.use('/forSale', forSale)

var databaseUrl = '';

if (provess.env.MONGODB_URI) {
    databaseUrl = provess.env.MONGODB_URI
} else {
    var databaseUrl = 'mongodb://localhost:27017/realestate';
}



mongoose.connection.on('connected', function () {
    console.log('mongoose is connected');
});

mongoose.connection.on('error', function () {
    console.log('mongoose failed');
});

mongoose.connect(databaseUrl);

app.listen(port, function () {
    console.log('Listening on port:', port)
});

