var app = angular.module('RealEstateApp', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider.when('/forRent', {
        templateUrl: '../templates/forrent.html',
        controller: 'ForRentController as vm'
    }).when('/forSale', {
        templateUrl: '../templates/forsale.html',
        controller: 'ForSaleController as vm'
    })
})


angular.module('RealEstateApp').controller('ModalInstancvm', function ($uibModalInstance, item) {
    var vm = this;
    console.log(item);
    vm.item = item;

    vm.ok = function () {
        $uibModalInstance.close(vm.item);
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});