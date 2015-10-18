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
    $.get("http://localhost:4567/data?series=memory")
    .done(function(data){
      $scope.dataz = data;
      $("#dataz").text(data);
      // $("#updateMe").text(data)
      $("#updateMe").highcharts('StockChart', {
            rangeSelector : {
                selected : 1
            },
            title : {
                text : 'Memory'
            },
            series : [{
                name : 'memoryKB',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    })
    $scope.awesomeThings = [
      'AngularJS',
      'Karma'
    ];
  });
