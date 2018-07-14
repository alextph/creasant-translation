'use strict';
angular
    .module('app.core')
    .component('sideBar', {
        templateUrl: 'components/sidebar/sidebar.tpl.html',
        controller: 'SidebarController as sidebar',
        bindings: {
            data: '=',
        }
    })
    .controller('SidebarController', function ($scope, $location, $routeParams, loginService) {
        $scope.$watch(
            function () {
                return loginService.islogged();
            },
            function (newValue) {
                if (newValue) {
                    $scope.islogged = true;
                } else {
                    angular.element(document.getElementById('sidebar')).removeClass('open');
                    $scope.islogged = false;
                }
            }
        );

        $scope.userProfilePic = 'assets/images/user_icon.png';
        $scope.userName = '[Username]';
        $scope.userLevel = '[User Level]';

        loginService.fetchuser().then(function(result) {
            if (result.data.length != 1) {
                loginService.logout();
            } else {
                $scope.userName = result.data[0].name;
                $scope.userLevel = (result.data[0].level == 'SUPERADMIN') ? 'Super Administrator' : 'Administrator';
            }
        });

        $scope.items = [
            {
                href: "#/admin/welcome",
                page: "welcome",
                name: "Welcome",
                icon: "",
            },
            {
                href: "#/admin/list/class",
                page: "class",
                name: "Class",
                icon: "",
            },
        ];

        $scope.isActive = function (loc) {
            return loc == $routeParams.page;
        }
    });