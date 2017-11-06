var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({
    rent: Number,
    sqft: Number,
    city: String
});

var Rental = mongoose.model('Rental', RentalSchema, 'rentals');

router.post('/', function(req, res){
    console.log(req.body);
    var rentalToAdd = new Rental(req.body)
    rentalToAdd.save(function(err, data){
        if(err) {
            console.log(err);
            res.sendAStatus(500);
        } else {
            res.sendStatus(201);
        }
    })
});

router.get('/', function (req, res) {
    var city = req.query.city;
    var query = {};
    if (city) {
        query.city = city;
    }
    Rental.find(query).sort({ rent: 1 }).then(function (rentals) {
        res.json(rentals);
    })
        .catch(function (err) {
            res.sendStatus(err);
        });
});

router.delete('/:id', function (req, res) {
    console.log(req.params.id);
    var rentalId = req.params.id;
    Rental.findByIdAndRemove({ '_id': rentalId }, function (err, data) {
        if (err) {
            console.log('error' + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

router.put('/:id', function (req, res) {
    var rentalId = req.params.id;

    Rental.findByIdAndUpdate({ '_id': rentalId }, req.body)
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function (err) {
            res.sendStatus(500);
        });

});

router.get('/city', function (req, res) {
    Rental.find().distinct('city', function (error, city) {
        city.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        })
        res.json(city);
    });
})

module.exports = router;