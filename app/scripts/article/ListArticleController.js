'use strict';

angular.module('articleModule')
	.controller('ListArticleController', ListArticleController)
	.config(function ($routeProvider) {
	$routeProvider
      .when('/', {
        templateUrl: 'views/article/list.html',
        controller: 'ListArticleController',
        controllerAs: 'article'
      })
	});

function ListArticleController(StorageService, ShareArticleService) {

    this.getAll = function() {
      return StorageService.list();
    };

    this.doRead =function(model) {
      ShareArticleService.set(model);
    };

    this.doEdit =function(model) {
      ShareArticleService.set(model);
    }; 
}