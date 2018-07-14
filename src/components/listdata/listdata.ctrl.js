'use strict';
angular
    .module('app.core')
    .component('listData', {
        templateUrl: 'components/listdata/listdata.tpl.html',
        controller: 'ListDataController',
        bindings: {
            data: '=',
        }
    })
    .controller('ListDataController', function ($scope) {
        $scope.checkAll = function () {
            $scope.selectedAll = ($scope.selectedAll) ? false : true;
            $scope.selected = $scope.selectedAll;
        };

        $scope.updateCheckAll = function (ele) {
            var allChecked = true;
           
        };
    });