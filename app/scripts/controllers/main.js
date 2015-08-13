'use strict';

/**
 * @ngdoc function
 * @name frontarticlesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontarticlesApp
 */
angular.module('frontarticlesApp')
  .filter('slugPattern', function(){    
      return function(title){
       return title.toLowerCase()
                .replace(/[^\w ]+/g,'')
                .replace(/ +/g,'-');
      };    
  })
  .filter('reverselist', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
  .controller('MainCtrl', function ($scope, toastr, localStorageService) {

    function Article() {
        this.title= "";
        this.slug= "";
        this.excerpt= ""; //sumário
        this.content= ""; //conteudo
        this.tags= "";
    }

    $scope.limit= 5;

    $scope.close_modal= true;
    var articlesInStore = localStorageService.get('articles');
    $scope.articles = articlesInStore || [];

    $scope.article= new Article();
    $scope.currentArticle= null;

    $scope.$watch('articles', function () {
      localStorageService.set('articles', $scope.articles);
    }, true);

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

    $scope.init = function () {
        console.log('Initing ...')
    }    

    $scope.newArticle = function() {
      $scope.currentArticle= null;
      $scope.article= new Article();
    };

    $scope.showArticle = function(article) {
      $scope.currentArticle = article;
    };

    $scope.editArticle = function(article) {
      $scope.currentArticle= null;
      $scope.article = article;
    };

    $scope.removeArticle = function (article) {
      console.log('removing ', article);

       $scope.articles= $scope.articles
               .filter(function (el) {
                console.log('removing ', article===el);
                  return el!==article;
               });

      toastr.info('O artigo foi removido', 'Information');
    };

    $scope.sendArticle = function() {

      if($.inArray($scope.article, $scope.articles) === 0) {
        updateArticle();
      } else {
        addArticle();
      }      
    };

    $scope.loadMore = function() {

      var newlimit= $scope.limit + 5;
      if($scope.articles.length < newlimit) {
        newlimit= $scope.articles.length;
      } 

      $scope.limit= newlimit;
    };
  });
