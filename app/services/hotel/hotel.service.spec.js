import * as testData from "../../../test-payload.json";

describe("HotelService", function() {
  var hotelService;
  var $httpBackend;

  beforeEach(angular.mock.module("hotelService"));
  beforeEach(inject(function(HotelService, _$httpBackend_) {
    hotelService = HotelService;
    $httpBackend = _$httpBackend_;
  }));

  describe("when the service loads", function() {
    it("should contain a HotelService service", function() {
      expect(hotelService).not.toEqual(null);
    });
  });

  describe("when getJson is called", function() {
    it("should return a json respose", function() {
      $httpBackend
        .when("GET", "https://homework-app.rocketmiles.com/fe-homework/rates")
        .respond(200, testData);
      hotelService.get().then(function(data) {
        expect(data.default.success).toEqual(true);
        expect(data.default.results.total).toEqual(20);
        expect(data.default.results.hotels[0].id).toEqual("907");
      });
      $httpBackend.flush();
    });

    it("should return a 500", function() {
      $httpBackend
        .when("GET", "https://homework-app.rocketmiles.com/fe-homework/rates")
        .respond(500);
      hotelService
        .get()
        .then()
        .catch(function(error) {
          expect(error.status).toEqual(500);
        });
      $httpBackend.flush();
    });
  });
});
