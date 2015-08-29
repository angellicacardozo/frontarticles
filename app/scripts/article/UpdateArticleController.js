'use strict';

angular.module('articleModule')
	.controller('UpdateArticleController', UpdateArticleController)
	.config(function ($routeProvider) {
	$routeProvider
      .when('/edit/:slug', {
        templateUrl: 'views/article/update.html',
        controller: 'UpdateArticleController',
        controllerAs: 'article'
      });
	});

function UpdateArticleController(ShareArticleService, StorageService) {

  this.model= ShareArticleService.get();

  this.doUpdate= function() {
    StorageService.update(this.model);
  };
}