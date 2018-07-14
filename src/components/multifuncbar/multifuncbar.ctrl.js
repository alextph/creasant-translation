'use strict';
angular
    .module('app.core')
    .component('multiFuncBar', {
        templateUrl: 'components/multifuncbar/multifuncbar.tpl.html',
        controller: 'MultiFuncBarController as multifuncbar',
        bindings: {
            data: '=',
        }
    })
    .controller('MultiFuncBarController', function ($scope, loginService, SweetAlert) {
        $scope.$watch(
            function () {
                return loginService.islogged();
            }, function (newValue) {
                $scope.islogged = newValue;
            }
        );

        $scope.toggleNav = function () {
            if (angular.element(document.getElementById('sidebar')).hasClass('open')) {
                angular.element(document.getElementById('sidebar')).removeClass('open');
                angular.element(document.getElementById('admin-wrapper')).addClass('extend');
            } else {
                angular.element(document.getElementById('sidebar')).addClass('open');
                angular.element(document.getElementById('admin-wrapper')).removeClass('extend');
            }
        }

        $scope.logout = function () {
            SweetAlert.swal({
                title: "Are you sure you want to log out?",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: true,
                closeOnCancel: true
            }, 
            function(isConfirm){
                if(isConfirm){
                    loginService.logout()
                } else {
                }
            });
        }
    });