'use strict';

angular
    .module('app.routes', ['ngRoute'])
    .config(($routeProvider, $locationProvider) => {
        $locationProvider.hashPrefix('');
        $routeProvider.
            when('/', {
                templateUrl: 'sections/search/search.tpl.html',
                controller: 'SearchController as search',
            })
            .when('/admin/', {
                redirectTo: '/admin/login'
            })
            .when('/admin/login', {
                templateUrl: 'sections/admin/login/login.tpl.html',
                controller: 'LoginController as login',
            })
            .when('/admin/:page', {
                templateUrl: function(params) {
                    return 'sections/admin/' + params.page + '/' + params.page+'.tpl.html'
                },
                controller: 'AdminController as admin',
            })
            .when('/admin/list/:page', {
                templateUrl: 'sections/admin/list/list.tpl.html',
                controller: 'ListController as list',
            })
            .when('/admin/add/:page', {
                templateUrl: 'sections/admin/add/add.tpl.html',
                controller: 'AddController as add',
            })
            .otherwise({
                redirectTo: '/'
            });
        })