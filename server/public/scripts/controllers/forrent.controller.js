app.controller('ForRentController', function (RealEstateService, $uibModal) {
    var vm = this;

    getRentals();

    // deletes current rental data
    vm.deleteRentals = function (rental) {
        RealEstateService.deleteRental(rental._id)
            .then(getRentals)
            .catch(onError);
    }

    // gets all rentals data
    function getRentals() {
        RealEstateService.getRentals()
            .then(function (rentals) {
                vm.rentals = rentals;
            });
    }

    // error function (not nessasary but for testing)
    function onError(err) {
        console.log(err);
    }

    // gets all cities available for rent
    RealEstateService.getAllCityForRental()
        .then(function (cities) {
            vm.cities = cities;
        })

    // select city to rent in
    vm.getByCity = function (city) {
        RealEstateService.getRentalByCity(city)
            .then(function (rentals) {
                vm.rentals = rentals;
            })
    }

    //opens modal for update
    vm.animationsEnabled = true;

    vm.open = function (item) {
        console.log('open', item);
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/templates/modal.html',
            controller: 'ModalInstancvm',
            controllerAs: 'vm',
            size: 'sm',
            // appendTo: parentElem,
            resolve: {
                item: function () {
                    item.type = 'rental';
                    return angular.copy(item);
                }
            }
        });

        modalInstance.result.then(function (updatedItem) {
            console.log('updated');
            console.log(updatedItem);
            RealEstateService.updateRental(updatedItem)
                .then(function () {
                    angular.merge(item, updatedItem);
                })
                .catch(function (err) {
                    // error
                })
            // api here to update the data
            // if success then update the display data

        }, function () {
            console.log('cancel');
        });
    };
})