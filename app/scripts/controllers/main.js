'use strict';

/**
 * @ngdoc function
 * @name frontarticlesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontarticlesApp
 */
angular.module('frontarticlesApp')
  .controller('MainCtrl', function ($scope, toastr) {

    function Article() {
        this.title= "";
        this.slug= "";
        this.excerpt= ""; //sumário
        this.content= ""; //conteudo
        this.tags= "";
    }

    $scope.articles = [];
    $scope.article= new Article();

  	var addArticle = function () {
  	  $scope.articles.push($scope.article);
  	  $scope.article = '';

      toastr.success('O artigo foi inserido', 'Toastr fun!');
  	};

    $scope.showArticle = function(article) {
      $scope.currentArticle = article;
    };

    $scope.editArticle = function(article) {
      $scope.article = article;
    };

    $scope.removeArticle = function (index) {
      $scope.articles.splice(index, 1);

      toastr.info('O artigo foi removido', 'Information');
    };

    $scope.sendArticle = function() {
      addArticle();
    };
    
  });
