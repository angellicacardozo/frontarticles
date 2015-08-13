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
        this.excerpt= ""; //sumário
        this.content= ""; //conteudo
        this.tags= "";

        Object.defineProperty(this, "slug", {
          get : function () {
            console.log('Get slug', this.title);
            return this.title.toLowerCase()
                .replace(/[^\w ]+/g,'')
                .replace(/ +/g,'-');
          },
          set : function (val) {
            console.log('Dont');
          }
        });
    }

    $scope.close_modal= true;
    $scope.articles = [];
    $scope.article= new Article();
    $scope.currentArticle= null;

  	var addArticle = function () {
  	  $scope.articles.push($scope.article);
  	  $scope.article = '';

      toastr.success('O artigo foi inserido', 'Toastr fun!');
      $('#formModal').modal('hide');
  	};

    var updateArticle = function() {
      var article = $scope.articles.find(function(element) {
          return element === $scope.article;
      });

      if(article !== undefined) {
        article = $scope.article;
        toastr.success('O artigo foi alterado', 'Toastr fun!');
        $('#formModal').modal('hide');
      }
      
    };

    $scope.showArticle = function(article) {
      $scope.currentArticle = article;
    };

    $scope.editArticle = function(article) {
      $scope.currentArticle= null;
      $scope.article = article;
    };

    $scope.removeArticle = function (index) {
      $scope.articles.splice(index, 1);

      toastr.info('O artigo foi removido', 'Information');
    };

    $scope.sendArticle = function() {

      if($.inArray($scope.article, $scope.articles) === 0) {
        updateArticle();
      } else {
        addArticle();
      }      
    };

  });
