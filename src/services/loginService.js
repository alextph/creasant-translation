'use strict';

let _ = require("lodash")

exports = module.exports = ($http, $location)=> {

  class LoginService {

    constructor() {
      this.user = null;
      this.defaultUser = {
        image: 'assets/images/user_icon.png'
      }
    }

    login(login, pwd) {
      var form_data = {
        'login': login,
        'pwd': pwd
      }
      return $http.post('./api/admin/login', form_data)
        .then( (result)=> {
          if (!result.data.admin_id) {
            throw new Error("Incorrect username/password");
          } else {
            this.user = _.extend(this.defaultUser, result.data);
            $location.path('/admin/welcome');
          }
        })
    }
    logout(){
      this.user = null;
      $http.get('./api/admin/logout')
        .then((result)=>{
          $location.path('/admin/login');
        })
    }
    fetchUser(){
      return $http.get('./api/admin/fetchUser').then((result)=>{
        if (_.isEmpty(result.data)) {
          return this.user = null
        }
        return this.user = _.extend(this.defaultUser, result.data);
      })
    }
  }

  return new LoginService();

}