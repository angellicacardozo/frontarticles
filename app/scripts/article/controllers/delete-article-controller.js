'use strict';

angular.module('articleModule')
	.controller('DeleteArticleController', DeleteArticleController)
	.config(function ($routeProvider) {
	$routeProvider
      .when('/delete/:slug', {
        templateUrl: 'views/article/delete.html',
        controller: 'DeleteArticleController',
        controllerAs: 'article'
      });
	});

function DeleteArticleController(ShareArticleService, StorageService, flash, $location) {

  this.model= ShareArticleService.get();

  this.doDelete= function() {
    StorageService.delete(this.model);
    flash.setMessage('Artigo removido com sucesso!', 'success');
    $location.path("/");
  };
}