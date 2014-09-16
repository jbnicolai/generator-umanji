(function () {

  'use strict';

  angular
    .module('<%= scriptAppName %>')
    .controller('MainCtrl', MainCtrl);

  /* @ngInject */
  function MainCtrl($scope, $http<% if(filters.socketio) { %>, socket<% } %>, MainSvc) {
    init(); 
    <% if(filters.mongoose) { %>
    $scope.addThing = addThing;
    $scope.deleteThing=  deleteThing;<% } %>

    function init() {
      $scope.awesomeThings = [];

      MainSvc.getThings().success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;<% if(filters.socketio) { %>
        socket.syncUpdates('thing', $scope.awesomeThings);<% } %>
      });
    }
    <% if(filters.mongoose) { %>
    function addThing() {
      if($scope.newThing === '') {
        return;
      }
      MainSvc.addThing({ name: $scope.newThing });
      $scope.newThing = '';
    };

    function deleteThing(thing) {
      MainSvc.deleteThing(thing._id);
    };<% } %><% if(filters.socketio) { %>

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });<% } %>

    $scope.isToggle1 = true;
    $scope.isToggle2 = true;

    $scope.anim1 = function() {
        $('.box').transition({ y: '200px' });
        $('.box').transition({ y: '0px' });
     } 

    $scope.anim2 = function() {

      $('.box').transition({ scale: 3.2 });
      $('.box').transition({ scale: 1 });
      
     } 

    $scope.anim3 = function() {
      $('.box').transition({ rotate: '360deg' });
      $('.box').transition({ rotate: '00deg' });
     } 
    
    $scope.showhide = function() {
      $('.box').transition({ opacity: 0, scale: 0, x: '-300px', y: '-500px' });
      $('.box').transition({ opacity: 1, scale: 1, x: '0', y: '0'  });
      // $('.box').transition({ opacity: '1' });
    }

    $scope.toggle1 = function() {
      
      if($scope.isToggle1) {
        $('.box').transition({ x: '200px' });
      }else {
        $('.box').transition({ x: '0px' });
      }

      $scope.isToggle1=!$scope.isToggle1;

    } 

    $scope.toggle2 = function() {
      
      if($scope.isToggle2) {
        $('.box').transition({ y: '-300px' });
      }else {
        $('.box').transition({ y: '0px' });
      }

      $scope.isToggle2=!$scope.isToggle2;

    } 
  }

})();