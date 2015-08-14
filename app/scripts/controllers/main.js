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

    // Configurando localStorageService ...
    var articlesInStore = localStorageService.get('articles');
    $scope.articles = articlesInStore || [];
    $scope.$watch('articles', function () {
      localStorageService.set('articles', $scope.articles);
    }, true);

    // Nosso contexto de leitura se inicia nulo
    $scope.currentArticle= null;

    // Objeto do formulário de edição/inserção
    $scope.article= new Article();
    // O rascunho do nosso artigo
    $scope.articledraft= new Article();

  	var addArticle = function () {

      $scope.articles.push($scope.article);

      //Limpamos o formulário
      $scope.article= new Article();

      //Fechamos o modal
      $('#formModal').modal('hide');
  	};

    var updateArticle = function() {
      //Buscamos o artigo
      var article = searchArticleInStorage($scope.article);

      if(article !== undefined) {
        applyChangesInStorage(article, $scope.article);
        toastr.success('O artigo foi alterado', 'Alterar...');

        //Fechamos o modal após a edição
        $('#formModal').modal('hide');

        //Limpamos nosso rascunho
        $scope.articledraft= new Article();
      }           
    };

    var searchArticleInStorage = function(article) {
      return $scope.articles.find(function(element) {
          return element === article;
      });
    };

    var applyChangesInStorage = function(article, draft) {
      $scope.articles.forEach(function(element) {
          if(element === article) {
            element.title= draft.title;
          }
      });
    };

    $scope.newArticle = function() {
      //Limpamos o contexto de leitura
      $scope.currentArticle= null;
      $scope.article= new Article();
    };

    $scope.showArticle = function(article) {
      //Preparamos o contexto de leitura
      $scope.currentArticle = article;
    };

    $scope.editArticle = function(article) {
      // Limpamos o contexto de leitura
      $scope.currentArticle= null;

      // Configuramos o rascunho para quando revertemos a alteração
      $scope.articledraft.title= article.title;
      $scope.articledraft.excerpt= article.excerpt;
      $scope.articledraft.content= article.content;
      $scope.articledraft.tags= article.tags;

      // O formulário apresenta o artigo escolhido
      $scope.article = article;
    };

    $scope.removeArticle = function (article) {
      $scope.articles= $scope.articles
               .filter(function (el) {
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

      // Revertemos alterações
      // Estamos em um contexto de edição/insercao?
      if($scope.currentArticle===null) {
        var article = searchArticleInStorage($scope.article);
        if(article!==undefined) {
          applyChangesInStorage(article, $scope.articledraft);
        }
      }

      $scope.currentArticle= null;
      $scope.article= new Article();
    };
  });
