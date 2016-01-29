'use strict';

angular.module('eggercise', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ui.bootstrap',
  'ngAnimate',
  'angular-toasty'
])

// only display home.js if the user is not logged in
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

  })
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
         else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {

    $rootScope.Auth = Auth;

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var requestedPath = $location.url();
      var publicPagePatterns = [/\/$/, /\/login$/, /\/invites\/accept\/\S+$/];

      Auth.isReadyLogged()
      .then(function() {
        $rootScope.unauthorized = false;

        publicPagePatterns.forEach(function(publicPage, index, publicPagePatterns) {
          if(publicPage.test(requestedPath)) {
            event.preventDefault();
            $location.path('/group');
          }
        });
      })
      .catch(function () {
        $rootScope.unauthorized = true;
        // if the user is not logged in and trying to access a restricted page
        // then redirect to the login page
        var restrictedPage = true;

        publicPagePatterns.forEach(function(publicPage, index, publicPagePatterns) {
          if (publicPage.test(requestedPath)) {
            restrictedPage = false;
          }
        });

        if (restrictedPage) { 
          $location.path('/login');
        }
      });
    });
  })

  .run(function ($rootScope, $location) {

    $rootScope.$on('$locationChangeStart', function() {
      $rootScope.previousPage = location.pathname;
    });

    $rootScope.back = function () {
      $location.path($rootScope.previousPage);
    };
  });
