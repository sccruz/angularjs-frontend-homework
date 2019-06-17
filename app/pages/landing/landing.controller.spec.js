describe("LandingController", function() {
  var LandingController;
  var HotelService;
  var hotelDefer;
  var hotelData = require("../../../test-payload.json");
  beforeEach(angular.mock.module("ui.router"));
  beforeEach(angular.mock.module("landing"));
  beforeEach(function() {
    angular.mock.module(function($provide) {
      HotelService = {
        get: jasmine.createSpy()
      };
      $provide.value("HotelService", HotelService);
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    hotelDefer = $q.defer();
    scope = $rootScope;
    HotelService.get.and.returnValue($q.resolve(hotelData));
    LandingController = $controller("LandingController", {
      $scope: $rootScope.$new()
    });
  }));

  describe("when the controller loads", function() {
    it("queries for the hotel data", function() {
      expect(HotelService.get).toHaveBeenCalled();
      scope.$digest();
      expect(LandingController.hotels.length).toEqual(20);
    });
  });

  describe("when user enters filter text", function() {
    it("should return a matched result for the search term", function() {
      scope.nameQuery = "omni";
      expect(
        LandingController.filterHotels(hotelData.results.hotels[0])
      ).toBeTruthy();
    });
  });
});
