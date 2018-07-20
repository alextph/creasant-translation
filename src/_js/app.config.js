'use strict';
angular
    .module('app.config', [])
    .run(runs);

function runs($rootScope) {
    $rootScope.$on('$routeChangeStart', function() {
    });
    $rootScope.$on('$routeChangeSuccess', function() {
    });
}
