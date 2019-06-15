describe('LandingController', function () {
    var LandingController;
    var HotelService;
    var hotelDefer;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('landing'));
    beforeEach(function() {
        angular.mock.module(function($provide) {
            HotelService = {
                get: jasmine.createSpy()
            };

            $provide.value('HotelService', HotelService);
        });
    });

    beforeEach(inject(function($controller, $q) {
        controller = $controller;
        hotelDefer = $q.defer();

        HotelService.get.and.returnValue(hotelDefer.promise);

        LandingController = $controller('LandingController');
    }));

    describe('when the controller loads', function () {
        it('queries for the hotel data', function () {
            expect(HotelService.get).toHaveBeenCalled();
        });
    });
});
