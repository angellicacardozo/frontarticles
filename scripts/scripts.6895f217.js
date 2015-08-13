"use strict";angular.module("frontarticlesApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","toastr","720kb.socialshare","LocalStorageModule","infinite-scroll"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("frontarticlesApp").filter("slugPattern",function(){return function(a){return a.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-")}}).filter("reverselist",function(){return function(a){return a.length>0?a.slice().reverse():a}}).controller("MainCtrl",["$scope","toastr","localStorageService",function(a,b,c){function d(){this.title="",this.slug="",this.excerpt="",this.content="",this.tags=""}a.limit=5,a.close_modal=!0;var e=c.get("articles");a.articles=e||[],a.article=new d,a.currentArticle=null,a.$watch("articles",function(){c.set("articles",a.articles)},!0);var f=function(){a.articles.push(a.article),b.success("O artigo foi inserido","Inserir..."),$("#formModal").modal("hide")},g=function(){var c=a.articles.find(function(b){return b===a.article});void 0!==c&&(c=a.article,b.success("O artigo foi alterado","Alterar..."),$("#formModal").modal("hide"))};a.newArticle=function(){a.currentArticle=null,a.article=new d},a.showArticle=function(b){a.currentArticle=b,a.article=new d},a.editArticle=function(b){a.currentArticle=null,a.article=b},a.removeArticle=function(c){a.articles=a.articles.filter(function(a){return console.log("removing ",c===a),a!==c}),b.info("O artigo foi removido","Remover...")},a.sendArticle=function(){0===$.inArray(a.article,a.articles)?g():f()},a.loadMore=function(){var b=a.limit+5;a.articles.length<b&&(b=a.articles.length),a.limit=b},a.cancelArticle=function(){a.currentArticle=null,a.article=new d},a.init=function(){$("#formModal").on("hidden.bs.modal",function(){console.log("form on hidden.bs.modal"),a.article=new d,a.currentArticle=null})},a.init()}]),angular.module("frontarticlesApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("frontarticlesApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="container"> <!-- Article list --> <div infinite-scroll="loadMore()"> <section> <h1>Artigos cadastrados</h1> <article ng-repeat="article in articles | reverselist | limitTo:limit"> <h1>{{article.title}}, <span class="mark slug">{{article.title | slugPattern}}</span></h1> <p class="excerpt">{{article.excerpt}}</p> <div class="btn-group" role="group" aria-label="..."> <button ng-click="showArticle(article)" data-toggle="modal" data-target="#formModal" type="button" class="btn btn-default">Visualizar</button> <button ng-click="editArticle(article)" data-toggle="modal" data-target="#formModal" type="button" class="btn btn-default">Editar</button> <button ng-click="removeArticle(article)" type="button" class="btn btn-default">Remove</button> </div> <a href="#/" socialshare socialshare-provider="facebook" socialshare-text="{{article.excerpt}}" socialshare-url="http://angellicacardozo.github.io/frontarticles/#/"> <img src="images/fb.ce300f97.png"> </a> <a href="#/" socialshare socialshare-provider="google+" socialshare-text="{{article.excerpt}}" socialshare-caption="{{article.title}}" socialshare-url="http://angellicacardozo.github.io/frontarticles/#/l"> <img src="images/gplus.8b9cb1e8.png"> </a> <a href="#/" socialshare socialshare-provider="twitter" socialshare-url="http://angellicacardozo.github.io/frontarticles/#/" socialshare-text="{{article.excerpt}}" socialshare-hashtags="{{article.tags}}"> <img src="images/tw.e8b20412.png"> </a> </article> </section> </div> <div ng-if="articles.length===0" class="alert alert-info"> <strong>Info!</strong> Nenhum artigo cadastrado. </div> <!-- Modal --> <div id="formModal" class="modal fade" role="dialog"> <div class="modal-dialog"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title"> <span ng-if="currentArticle!==null">{{currentArticle.title}} | Artigo</span> <span ng-if="article.title!==\'\' && currentArticle===null">Editar {{article.title}}</span> <span ng-if="article.title===\'\' &&currentArticle===null">Novo Artigo</span> </h4> </div> <div class="modal-body"> <!-- Article input --> <form class="form-horizontal" role="form" name="articleForm" ng-if="currentArticle===null" ng-submit="sendArticle()" unsaved-warning-form> <div class="form-group"> <label class="control-label col-sm-2" for="titulo">Titulo:</label> <div class="col-sm-10"> <input id="titulo" name="titulo" ng-required="true" placeholder="Pensa em escrever o que?" ng-model="article.title"> </div> </div> <div class="form-group"> <label class="control-label col-sm-2" for="titulo">Tags:</label> <div class="col-sm-10"> <input ng-required="true" ng-model="article.tags"> </div> </div> <div class="form-group"> <label class="control-label col-sm-2" for="titulo">Sum&aacute;rio:</label> <div class="col-sm-10"> <textarea ng-model="article.excerpt" ng-required="true"></textarea> </div> </div> <div class="form-group"> <label class="control-label col-sm-2" for="titulo">Conte&uacute;do:</label> <div class="col-sm-10"> <textarea ng-model="article.content" ng-required="true"></textarea> </div> </div> <input type="submit" class="btn btn-primary" value="Salvar"> </form> <dl ng-if="currentArticle!==null"> <dt>Título</dt> <dd>{{currentArticle.title}}</dd> <dt>Sum&aacute;rio</dt> <dd>{{currentArticle.excerpt}}</dd> <dt>Conte&uacute;do:</dt> <dd>{{currentArticle.content}}</dd> </dl> </div> <div class="modal-footer"> <button ng-click="cancelArticle()" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button> </div> </div> </div> </div></div>')}]);