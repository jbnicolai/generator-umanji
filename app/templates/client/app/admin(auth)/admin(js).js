(function(){

  'use strict';

  angular
    .module('<%= scriptAppName %>')
    .config(config);

  /* @ngInject */
  function config($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  };

})();