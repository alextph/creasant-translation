'use strict';

import 'angular/angular.min'
import 'angular-route'
import 'angular-animate'
import 'angular-sanitize'

import './app.config'
import './app.core'
import './app.routes'
import './app.services'

import '../sections/search/search.ctrl'
import '../sections/admin/login/login.ctrl'
import '../sections/admin/welcome/welcome.ctrl'
import '../sections/admin/list/list.ctrl'
import '../sections/admin/add/add.ctrl'

import '../components/sidebar/sidebar.ctrl'
import '../components/multifuncbar/multifuncbar.ctrl'
import '../components/listdata/listdata.ctrl'
import '../components/adddata/adddata.ctrl'
import '../components/breadcrumb/breadcrumb.ctrl'

import '../services/loginService'
import '../services/sessionService'

import 'angular-sweetalert'
import 'angular-smart-table'

angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'app.routes', 'app.core', 'app.services', 'app.config', 'loginService', 'sessionService', 'oitozero.ngSweetAlert', 'smart-table'
]);