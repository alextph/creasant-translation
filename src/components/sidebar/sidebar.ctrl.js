'use strict';

exports = module.exports = ($scope, $location, loginService)=> {

  class SidebarController {

    constructor() {
      this.loginService = loginService;
      this.isOpen = true

      loginService.fetchUser().then((user)=> {
        if (!user) {
          loginService.logout();
        } else {
          $location.path('/admin/welcome')
        }
      });

      this.items = [
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
    }
  }

  return new SidebarController()
}

angular.module('app.core')
  .controller('SidebarController', exports)
  .component('sideBar', {
      templateUrl: 'components/sidebar/sidebar.tpl.html',
      controller: 'SidebarController as ctrl',
      bindings: {
          data: '=',
      }
  })

