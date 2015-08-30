'use strict';

angular.module('articleModule')
	.controller('CreateArticleController', CreateArticleController)
	.config(function ($routeProvider) {
	$routeProvider
      .when('/create', {
        templateUrl: 'views/article/create.html',
        controller: 'CreateArticleController',
        controllerAs: 'article'
      });
	});

function CreateArticleController(StorageService, $location, flash) {

  function Article() {
        this.title= "";
        this.slug= "";
        this.excerpt= ""; //sumário
        this.content= ""; //conteudo
        this.tags= "";
  }

  this.model= new Article();
  
  this.doSave = function() {
      StorageService.add(this.model);
      flash.setMessage('Artigo cadastrado com sucesso!', 'success');
      $location.path("/");
  };
}