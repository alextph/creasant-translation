'use strict';

angular
    .module('loginService', [])
	.factory('loginService', function($http, $location, sessionService){
		return{
			login: function(login, pwd, $scope){
				var form_data = {
					'login': login,
					'pwd': pwd
				}
				
				$http({
					method: 'POST',
					url: './api/admin/login/',
					params: form_data,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				.then(function (result) {
					if (result.data.length == 0) {
						$scope.errorMsg = "Incorrect username/password";
						$scope.loading = false;
					} else {
						sessionService.set('logged_admin', result.data[0].admin_id);
						$location.path('/admin/welcome');
					}
				});
			},
			logout: function(){
				sessionService.destroy('logged_admin');
				$location.path('/admin/login');
			},
			islogged: function(){
				var checkSession = (sessionService.get('logged_admin') != undefined && sessionService.get('logged_admin') != null) ? true : false;
				return checkSession;
			},
			fetchuser: function(){
				var form_data = {
					'admin_id': sessionService.get('logged_admin'),
				}

				return $http({
					method: 'POST',
					url: './api/admin/fetchUser/',
					params: form_data,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})
			}
		}
	});