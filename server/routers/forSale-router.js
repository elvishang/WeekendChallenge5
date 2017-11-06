var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ForSaleSchema = new Schema({
    cost: Number,
    sqft: Number,
    city: String
});

var ForSale = mongoose.model('ForSale', ForSaleSchema, 'listings');

router.get('/', function (req, res) {
    var city = req.query.city;
    var query = {};
    if (city) {
        query.city = city;
    }
    ForSale.find(query).sort({ cost: 1 }).then(function (listings) {
        res.json(listings);
    })
        .catch(function (err) {
            res.sendStatus(err);
        });
});

router.get('/city', function (req, res) {
    ForSale.find().distinct('city', function (error, city) {
        city.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        })
        res.j
        res.json(city);
    });
})

router.post('/', function(req, res){
    console.log(req.body);
    var listingToAdd = new ForSale (req.body)
    listingToAdd.save(function(err, data){
        if(err) {
            console.log(err);
            res.sendAStatus(500);
        } else {
            res.sendStatus(201);
        }
    })
});

router.delete('/:id', function (req, res) {
    var listingId = req.params.id;
    ForSale.findByIdAndRemove({ '_id': listingId }, function (err, data) {
        if (err) {
            console.log('error' + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

router.put('/:id', function (req, res) {
    var listingId = req.params.id;

    console.log(req.body);

    ForSale.findByIdAndUpdate({ '_id': listingId }, req.body)
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function (err) {
            res.sendStatus(500);
        });

});

module.exports = router;