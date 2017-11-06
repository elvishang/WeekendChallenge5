app.service('RealEstateService', function ($http) {
    var vm = this;

    // gets rentals data from database
    vm.getRentals = function () {
        return $http.get('/forRent').then(function (response) {
            console.log(response);
            return response.data;
        }).catch(function (error) {
            console.log('Failed');
        });
    }

    // gets listings data from database
    vm.getForSales = function () {
        return $http.get('/forSale').then(function (response) {
            console.log(response);
            return response.data;
        }).catch(function (error) {
            console.log('Failed');
        });
    }

    // gets cities in listings from database
    vm.getForSalesByCity = function (city) {
        return $http.get('/forSale?city=' + city).then(function (response) {
            console.log(response);
            return response.data;
        }).catch(function (error) {
            console.log('Failed');
        });
    }

    // gets cities in rentals from database
    vm.getRentalByCity = function (city) {
        return $http.get('/forRent?city=' + city).then(function (response) {
            console.log(response);
            return response.data;
        }).catch(function (error) {
            console.log('Failed');
        });
    }

    // updates rental data
    vm.updateRental = function (rental) {
        return $http.put('/forRent/' + rental._id, rental);
    }
    // updates listing data
    vm.updateListing = function (listing) {
        return $http.put('/forSale/' + listing._id, listing);
    }
    // deletes rental data
    vm.deleteRental = function (rentalId) {
        return $http.delete('/forRent/' + rentalId);
    }
    // deletes listing data
    vm.deleteListing = function (listingId) {
        return $http.delete('/forSale/' + listingId);
    }

    // gets all cities in rental data
    vm.getAllCityForRental = function () {
        return $http.get('/forRent/city')
            .then(function (response) {
                return response.data;
            });
    }

    // gets all cities in listings data
    vm.getAllCityForSale = function () {
        return $http.get('/forSale/city')
            .then(function (response) {
                return response.data;
            });
    }
})