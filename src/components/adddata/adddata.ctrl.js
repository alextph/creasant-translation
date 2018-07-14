'use strict';
angular
    .module('app.core')
    .component('addData', {
        templateUrl: 'components/adddata/adddata.tpl.html',
        controller: 'AddDataController',
        bindings: {
            data: '=',
        }
    })
    .controller('AddDataController', function ($scope, $http, $routeParams) {
        $scope.formData = {
            parameters: {}
        };

        $scope.uncheckRadio = function (ele, event) {
            if ($scope.formData.parameters[ele.$parent.$parent.value.field] == event.target.value) {
                $scope.formData.parameters[ele.$parent.$parent.value.field] = false;
            }
        }

        $scope.toggleCheckbox = function (ele) {
            var noChecked = true;
            angular.forEach($scope.formData.parameters[ele.$parent.$parent.value.field], function(value, key) {
                console.log(key + ':' + value);
                if (value === true && key != 'noChecked') {
                    noChecked = false;
                }
            });
            console.log(noChecked);
            $scope.formData.parameters[ele.$parent.$parent.value.field].noChecked = noChecked;
        }

        $scope.formSubmit = function() {
            console.log($scope.formData);
            // var form_data = {

            // };

            // $http({
            //     method: 'POST',
            //     url: './api/admin/add/' + $routeParams.page,
            //     params: form_data,
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // })
            // .then(function (result) {
            //     if (result.data.length != 0) {
            //         emptyData = false;
            //         table_content = result.data;
            //     }

            //     $scope.pageData = {
            //         'emptyData': emptyData,
            //         'pageID': pageID,
            //         'pageTitle': pageTitle,
            //         'rowsPerPage': rowsPerPage,
            //         'hasCheckBox': hasCheckBox,
            //         'addItem': addItem,
            //         'addItemURL': addItemURL,
            //         'editItem': editItem,
            //         'editItemURL': editItemURL,
            //         'removeItem': removeItem,
            //         'removeItemURL': removeItemURL,
            //         'table_header': table_header,
            //         'table_content': table_content,
            //         'table_content_count': result.data.length,
            //         'table_pagination': table_content
            //     };

            //     console.log(table_content);
            // });
        }
    });