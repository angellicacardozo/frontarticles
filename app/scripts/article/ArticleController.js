'use strict';

angular.module('articleModule')
	.controller('ArticleController', ArticleController)
	.config(function ($routeProvider) {
	$routeProvider
      .when('/', {
        templateUrl: 'views/article/list.html',
        controller: 'ArticleController',
        controllerAs: 'article'
      })
      .when('/create', {
        templateUrl: 'views/article/create.html',
        controller: 'ArticleController',
        controllerAs: 'article'
      });
	});

function ArticleController(StorageService) {

	function Article() {
        this.title= "";
        this.slug= "";
        this.excerpt= ""; //sumário
        this.content= ""; //conteudo
        this.tags= "";
    }

    this.model= new Article();
    this.models= [];

    this.doSave = function() {
    	StorageService.add(this.model);
    	this.model= new Article();
    };

    this.getAll = function() {
    	return StorageService.list();
    };
}