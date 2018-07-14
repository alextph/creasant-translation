'use strict';
angular
    .module('app.core')
    .controller('SearchController', function($scope, $http) {
        $scope.searchResult = '';

        $scope.fetchSearch = function () {
            if ($scope.keyword != '') {
                $http.get('./api/search/' + $scope.keyword).then(function (result) {
                    $scope.searchResult = result.data;
                    if (result.data.length == 0) {
                        $scope.searchResult = '<div class="message">No Results Found</div>';
                    } else {
                        $scope.searchResult = '';
                        
                    }
                });
            } else {
                $scope.searchResult = '';
            }
        }
    })