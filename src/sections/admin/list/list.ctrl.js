'use strict';
angular
    .module('app.core')
    .controller('ListController', function ($scope, $routeParams, $http) {
        $scope.pageData = [];
        let pageTitle = '[Page Title]';
        let emptyData = true;

        let hasCheckBox = true;
        let addItem = false; let addItemURL = '';
        let editItem = false; let editItemURL = '';
        let removeItem = false; let removeItemURL = '';
        let table_header = []; let table_content = [];
        let pageID = '';

        let rowsPerPage = 10;

        switch ($routeParams.page) {
            case 'class':
                pageID = 'class';
                pageTitle = 'Class';
                hasCheckBox = true;
                addItem = true;
                addItemURL = '/#/admin/add/' + $routeParams.page;
                editItem = true;
                editItemURL = '/#/admin/edit/' + $routeParams.page;
                removeItem = true;
                removeItemURL = '/#/admin/remove/' + $routeParams.page;
                rowsPerPage = 10;
                table_header = {
                    'Title': {
                        'field': 'title_en',
                        'class': '',
                        'search_type': 'text',
                        'filter': ''
                    },
                    'Slogan': {
                        'field': 'slogan_en',
                        'class': 'nl2br',
                        'search_type': 'text',
                        'filter': ''
                    },
                    'Launch Date': {
                        'field': 'launch_date',
                        'class': '',
                        'search_type': 'month',
                        'filter': ' | date: \'MMMM yyyy\''
                    }
                }
                break;

            default:
                pageTitle = '[Page Title]';
                hasCheckBox = false;
                addItem = false;
                addItemURL = '';
                editItem = false;
                editItemURL = '';
                removeItem = false;
                removeItemURL = '';
                table_header = [];
                table_content = [];
                rowsPerPage = 10;
                break;
        }
        $scope.pageTitle = pageTitle;

        $scope.breadcrumbData = {
            breadcrumb: [
                { name: pageTitle, portal: "" },
            ]
        };

        $http.get( `./api/admin/list/${$routeParams.page}`)
        .then(function (result) {
            if (result.data.length != 0) {
                emptyData = false;
                table_content = result.data;
            }

            $scope.pageData = {
                'emptyData': emptyData,
                'pageID': pageID,
                'pageTitle': pageTitle,
                'rowsPerPage': rowsPerPage,
                'hasCheckBox': hasCheckBox,
                'addItem': addItem,
                'addItemURL': addItemURL,
                'editItem': editItem,
                'editItemURL': editItemURL,
                'removeItem': removeItem,
                'removeItemURL': removeItemURL,
                'table_header': table_header,
                'table_content': table_content,
                'table_content_count': result.data.length,
                'table_pagination': table_content
            };

            console.log(table_content);
        });
    });