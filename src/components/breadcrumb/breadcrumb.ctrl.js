'use strict';
angular
    .module('app.core')
    .component('breadcrumb', {
        templateUrl: 'components/breadcrumb/breadcrumb.tpl.html',
        bindings: {
            data: '=',
        }
    });