'use strict';
angular
    .module('app.core')
    .controller('LoginController', ['$scope', 'loginService', function ($scope, loginService) {
        $scope.loading = false;

        $scope.formSubmit = function () {
            $scope.loading = true;

            loginService.login(this.username, this.password, $scope);

            $scope.error = '';
            this.username = '';
            this.password = '';
        }
    }]);