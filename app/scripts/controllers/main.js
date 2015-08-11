'use strict';

/**
 * @ngdoc function
 * @name frontarticlesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontarticlesApp
 */
angular.module('frontarticlesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.articles = [];

  	$scope.addArticle = function () {
  	  $scope.articles.push($scope.article);
  	  $scope.article = '';
  	};

    $scope.removeArticle = function (index) {
      $scope.articles.splice(index, 1);
    };
    
  });
