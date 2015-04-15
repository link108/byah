'use strict';

/**
 * @ngdoc function
 * @name byahApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the byahApp
 */
angular.module('byahApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
