'use strict';

angular.module('articleModule')
	.controller('ReadArticleController', ReadArticleController)
	.config(function ($routeProvider) {
	$routeProvider
      .when('/read/:slug', {
        templateUrl: 'views/article/read.html',
        controller: 'ReadArticleController',
        controllerAs: 'article'
      });
	});

function ReadArticleController(ShareArticleService) {
  this.model= ShareArticleService.get();
}