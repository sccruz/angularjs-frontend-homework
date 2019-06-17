import angular from "angular";

angular
  .module("landing")
  .controller("LandingController", ["HotelService", LandingController]);

function LandingController(HotelService) {
  var vm = this;
  vm.hotels = [];
  vm.filterHotels = [];
  vm.nameQuery = "";
  vm.sortOptions = [
    {
      label: "Recommended",
      id: "recommended"
    },
    {
      label: "Price low-to-high",
      id: "price-asc"
    },
    {
      label: "Price high-to-low",
      id: "price-desc"
    }
  ];
  vm.activeSort = vm.sortOptions[0];
  vm.responseError = false;

  init();

  function init() {
    HotelService.get()
      .then(function(response) {
        vm.hotels = response.results.hotels.map((hotel, index) => {
          // used to sort on 'recommended' option
          return { ogOrder: index, ...hotel };
        });
      })
      .catch(function(error) {
        console.log(error, vm.hotels);
        vm.responseError = true;
      });
  }

  vm.filterHotels = function(element) {
    if (!!element) {
      const baseComparision = element.hotelStaticContent.name.toLowerCase();
      const inputComparision = vm.nameQuery.toLowerCase();
      return baseComparision.indexOf(inputComparision) > -1;
    }
  };

  vm.reset = function() {
    vm.activeSort = vm.sortOptions[0];
    vm.nameQuery = "";
    vm.responseError = false;
  };

  vm.hotelSort = function(hotel) {
    switch (vm.activeSort.id) {
      case "recommended": {
        return hotel.ogOrder;
      }
      case "price-asc": {
        return +hotel.lowestAveragePrice.amount;
      }
      case "price-desc": {
        return -hotel.lowestAveragePrice.amount;
      }
    }
  };

  vm.test = function() {
    return "test";
  };
}
