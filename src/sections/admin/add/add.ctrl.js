'use strict';
angular
    .module('app.core')
    .controller('AddController', function ($scope, $routeParams) {
        $scope.pageData = [];
        let pageTitle = '[Page Title]';
        let form_field = [];

        switch ($routeParams.page) {
            case 'class':
                pageTitle = 'Class';
                form_field = {
                    'Launch Date': {
                        'required': true,
                        'disabled': false,
                        'field': 'launch_date',
                        'type': 'date',
                        'min': '',
                        'max': '',
                        'placeholder': '',
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': 'width: 49.5%;',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'none'
                    },
                    'Title (EN)': {
                        'required': true,
                        'disabled': false,
                        'field': 'title_en',
                        'type': 'text',
                        'placeholder': '',
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': '',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'left'
                    },
                    'Title (TC)': {
                        'required': true,
                        'disabled': false,
                        'field': 'title_tc',
                        'type': 'text',
                        'placeholder': '',
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': '',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'right'
                    },
                    'Slogan (EN)': {
                        'required': true,
                        'disabled': false,
                        'field': 'slogan_en',
                        'type': 'textarea',
                        'placeholder': '',
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': '',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'left'
                    },
                    'Slogan (TC)': {
                        'required': true,
                        'disabled': false,
                        'field': 'slogan_tc',
                        'type': 'textarea',
                        'placeholder': '',
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': '',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'right'
                    },
                    'Select': {
                        'required': true,
                        'disabled': false,
                        'field': 'select',
                        'type': 'select',
                        'multiple': false,
                        'selectedOptions': [
                            
                        ],
                        'option': [
                            {
                                id: 1,
                                name: 'Opt 1',
                                disabled: false
                            },
                            {
                                id: 2,
                                name: 'Opt 2',
                                disabled: false
                            },
                            {
                                id: 3,
                                name: 'Opt 3',
                                disabled: false
                            },
                        ],
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': 'width: 49.5%;',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'none'
                    },
                    'Radio': {
                        'required': true,
                        'field': 'radio',
                        'type': 'radio',
                        'checkedOptions': null,
                        'option': [
                            {
                                id: 1,
                                name: 'Opt 1',
                                disabled: false
                            },
                            {
                                id: 2,
                                name: 'Opt 2',
                                disabled: false
                            },
                            {
                                id: 3,
                                name: 'Opt 3',
                                disabled: false
                            },
                        ],
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': '',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'none'
                    },
                    'Checkbox': {
                        'required': true,
                        'field': 'checkbox',
                        'type': 'checkbox',
                        'checkedOptions': [
                        ],
                        'option': [{
                                id: 1,
                                name: 'Opt 1',
                                disabled: false
                            },
                            {
                                id: 2,
                                name: 'Opt 2',
                                disabled: false
                            },
                            {
                                id: 3,
                                name: 'Opt 3',
                                disabled: false
                            },
                        ],
                        'filter': '',
                        'fieldClass': '',
                        'fieldStyle': '',
                        'wrapperClass': '',
                        'wrapperStyle': '',
                        'wrapperInline': 'none'
                    },

                }
                break;

            default:
                pageTitle = '[Page Title]';
                break;
        }
        $scope.pageTitle = pageTitle;

        $scope.breadcrumbData = {
            breadcrumb: [
                { name: pageTitle, portal: "#/admin/list/class" }, 
                { name: "Create", portal: "" }, 
            ]
        };

        $scope.pageData = {
            'form_field': form_field
        }
    });