import angular from "angular";

class HotelService {
  constructor($http) {
    "ngInject";
    this.get = function() {
      return $http
        .get("https://homework-app.rocketmiles.com/fe-homework/rates")
        .then(function(response) {
          return response.data;
        })
        .catch(angular.noop());
    };
    this.getJson = function() {
      return $http
        .get("../test-payload.json")
        .then(function(response) {
          return response.data;
        })
        .catch(angular.noop());
    };
  }
}

export { HotelService };
