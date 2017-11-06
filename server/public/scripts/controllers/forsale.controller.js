app.controller('ForSaleController', function (RealEstateService, $uibModal) {
    var vm = this;

    getListings();


    // deletes current listing
    vm.deleteListing = function (listing) {
        RealEstateService.deleteListing(listing._id)
            .then(getListings)
            .catch(onError);
    }

    // gets all listings data
    function getListings() {
        RealEstateService.getForSales()
            .then(function (forSale) {
                vm.forSale = forSale;
            });
    }

    //error function (not nessasary but for testing)
    function onError(err) {
        console.log(err);
    }

    // gets list of cities
    RealEstateService.getAllCityForSale()
        .then(function (cities) {
            vm.cities = cities;
        })

    // able to select by city
    vm.getByCity = function (city) {
        RealEstateService.getForSalesByCity(city)
            .then(function (listings) {
                vm.forSale = listings;
            })
    }

    // opens modal for update
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
                    item.type = 'sale';
                    return angular.copy(item);
                }
            }
        });

        modalInstance.result.then(function (updatedItem) {
            console.log('updated');
            console.log(updatedItem);
            RealEstateService.updateListing(updatedItem)
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