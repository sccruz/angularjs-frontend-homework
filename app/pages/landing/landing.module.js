import angular from 'angular';
import template from './landing.html';

angular.module('landing', [ 'hotelService' ])
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('landing', {
            url: '/',
            template: template,
            controller: 'LandingController',
            controllerAs: 'landingCtrl'
        });
}