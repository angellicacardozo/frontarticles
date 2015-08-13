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

      if(items.length > 0) {
        return items.slice().reverse();
      }

      return items;
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
    $scope.$watch('articles', function () {
      localStorageService.set('articles', $scope.articles);
    }, true);

    $scope.currentArticle= null;

    // Objeto do formulário de edição/inserção
    $scope.article= new Article();

  	var addArticle = function () {

      $scope.articles.push($scope.article);

      //Limpamos o formulário
      $scope.article= new Article();

      //Fechamos o modal
      $('#formModal').modal('hide');
  	};

    var updateArticle = function() {
      //Buscamos o artigo
      var article = $scope.articles.find(function(element) {
          return element === $scope.article;
      });

      if(article !== undefined) {
        article = $scope.article;
        toastr.success('O artigo foi alterado', 'Alterar...');

        //Fechamos o modal após a edição
        $('#formModal').modal('hide');
      }           
    };

    $scope.newArticle = function() {
      //Limpamos o contexto de leitura
      $scope.currentArticle= null;
      $scope.article= new Article();
    };

    $scope.showArticle = function(article) {
      //Preparamos o contexto de leitura
      $scope.currentArticle = article;
      $scope.article= new Article();
    };

    $scope.editArticle = function(article) {
      // Limpamos o contexto de leitura
      $scope.currentArticle= null;
      // O formulário apresenta o artigo escolhido
      $scope.article = article;
    };

    $scope.removeArticle = function (article) {
       $scope.articles= $scope.articles
               .filter(function (el) {
                console.log('removing ', article===el);
                  return el!==article;
               });

      toastr.info('O artigo foi removido', 'Remover...');
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

      if($scope.articles.length < newlimit && $scope.articles.lengt > 0) {
        newlimit= $scope.articles.length;
      } 

      $scope.limit= newlimit;
    };

    $scope.cancelArticle = function() {

      // 'Really cancel?'

      $scope.currentArticle= null;
      $scope.article= new Article();
    };
  });
