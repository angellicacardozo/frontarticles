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

function UpdateArticleController(ShareArticleService, StorageService, flash, $location) {

  this.model= ShareArticleService.get();

  this.doUpdate= function() {
    StorageService.update(this.model);
    flash.setMessage('Artigo editado com sucesso!', 'success');
    $location.path("/");
  };
}