(function() {

  'use strict';

  angular
    .module('<%= scriptAppName %>', [<%= angularModules %>])
    .config(config)
    .factory('authInterceptor', authInterceptor)
    .run(run);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $httpProvider.interceptors.push('authInterceptor');
  }

  /* @ngInject */
  function run($rootScope, $location, Restangular) {

    // Restangular default setting 
    Restangular.setBaseUrl('api');
    Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {

      var extractedData;
      if (operation === "getList") {
        extractedData = data.data;
      } else {
        extractedData = data;
      }
      
      return extractedData;
    });


    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      
    });
  }

  /* @ngInject */
  function authInterceptor($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

})();  