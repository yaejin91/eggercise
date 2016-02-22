'use strict';

angular.module('eggercise')
  .service('Auth', ['ErrorService','$rootScope', '$cookieStore', '$q', '$http', '$location', function (ErrorService, $rootScope, $cookieStore, $q, $http, $location) {

    var service = {};
    var _user = {};
    var _ready = $q.defer();

    if ($cookieStore.get('token')) {
      $http.get('/api/users/me')
        .then(function (res) {
          _user = res.data;
        })
        .finally(function () {
          _ready.resolve();
        });
    } else {
      _ready.resolve();
    }

    /**
     * Signup
     *
     * @param user
     * @returns {promise}
     */
    service.signup = function (user) {
      var deferred = $q.defer();
    
      $http.post('/api/users', user)
        .then(function (res) {
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          ErrorService.errorToasty('This username/email is already taken.')

          // deferred.reject(err.data);
        });
      
      return deferred.promise;
    };

    service.signupForInvite = function (inviteId, groupId, user) {
      var deferred = $q.defer();
      $http.post('/api/invites/accept/' + inviteId, user)
        .then(function (res) {
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          $location.path('/group');
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Login
     *
     * @param user
     * @returns {promise}
     */
    service.login = function (user) {
      var deferred = $q.defer();
      $http.post('/auth/local', user)
        .then(function (res) {
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Logout
     */
    service.logout = function () {
      $cookieStore.remove('token');
      _user = {};
    };

    /**
     * Check if the user is logged
     *
     * @returns {boolean}
     */
    service.isLogged = function () {
      return _user.hasOwnProperty('_id');
    };

    /**
     * Check if the user is logged after the ready state
     *
     * @returns {Promise}
     */
    service.isReadyLogged = function () {
      var def = $q.defer();
      _ready.promise.then(function () {
        if (_user.hasOwnProperty('_id')) {
          def.resolve();
        } else {
          def.reject();
        }
      });
      return def.promise;
    };

    /**
     * Returns the user
     *
     * @returns {object}
     */
    service.getUser = function () {
      return _user;
    };

    service.getUserNow = function () {
      var deferred = $q.defer();

      if($cookieStore.get('token')){
        $http.get('/api/users/me')
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function (error) {
            deferred.reject('Error: ',  error);
          });
      }else{
        deferred.resolve(_user);
      }
      return deferred.promise;
    };
    return service;
  }]);
