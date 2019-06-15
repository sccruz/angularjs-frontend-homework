import * as angular from 'angular';

angular.module('landing')
    .controller('LandingController', ['HotelService', LandingController]);

function LandingController(HotelService) {
    var vm = this;
    vm.hotels = [];

    init();

    function init() {
      HotelService.get()
        .then(function(response) {
          vm.hotels = response.results.hotels;
        })
        .catch(angular.noop());
    }
}
