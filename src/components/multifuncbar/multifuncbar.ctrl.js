'use strict';

exports = module.exports = ($timeout, loginService, SweetAlert)=> {

  class MultiFuncBarController {

    constructor() {
      this.loginService = loginService
    }

    toggleNav() {
      if (angular.element(document.getElementById('sidebar')).hasClass('open')) {
          angular.element(document.getElementById('sidebar')).removeClass('open');
          angular.element(document.getElementById('admin-wrapper')).addClass('extend');
      } else {
          angular.element(document.getElementById('sidebar')).addClass('open');
          angular.element(document.getElementById('admin-wrapper')).removeClass('extend');
      }
    }

    logout() {
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
      (isConfirm)=> {
        if(isConfirm){
          loginService.logout()
        }
      });
    }

  }

  return new MultiFuncBarController()
}

angular
    .module('app.core')
    .component('multiFuncBar', {
        templateUrl: 'components/multifuncbar/multifuncbar.tpl.html',
        controller: 'MultiFuncBarController as ctrl',
        bindings: {
            data: '=',
        }
    })
    .controller('MultiFuncBarController', exports)


