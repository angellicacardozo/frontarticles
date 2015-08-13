"use strict";angular.module("frontarticlesApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","toastr","720kb.socialshare","LocalStorageModule","infinite-scroll"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("frontarticlesApp").filter("slugPattern",function(){return function(a){return a.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-")}}).filter("reverselist",function(){return function(a){return a.slice().reverse()}}).controller("MainCtrl",["$scope","toastr","localStorageService",function(a,b,c){function d(){this.title="",this.slug="",this.excerpt="",this.content="",this.tags=""}a.limit=5,a.close_modal=!0;var e=c.get("articles");a.articles=e||[],a.article=new d,a.currentArticle=null,a.$watch("articles",function(){c.set("articles",a.articles)},!0);var f=function(){a.articles.push(a.article),a.article="",b.success("O artigo foi inserido","Toastr fun!"),$("#formModal").modal("hide")},g=function(){var c=a.articles.find(function(b){return b===a.article});void 0!==c&&(c=a.article,b.success("O artigo foi alterado","Toastr fun!"),$("#formModal").modal("hide"))};a.init=function(){console.log("Initing ...")},a.newArticle=function(){a.currentArticle=null,a.article=new d},a.showArticle=function(b){a.currentArticle=b},a.editArticle=function(b){a.currentArticle=null,a.article=b},a.removeArticle=function(c){a.articles.splice(c,1),b.info("O artigo foi removido","Information")},a.sendArticle=function(){0===$.inArray(a.article,a.articles)?g():f()},a.loadMore=function(){var b=a.limit+5;a.articles.length<b?b=a.articles.length:a.limit=b,console.log("loadMore..",a.limit)}}]),angular.module("frontarticlesApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("frontarticlesApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="container"> <h2>Articles</h2> <button type="button" ng-click="newArticle()" class="btn btn-info btn-lg" data-toggle="modal" data-target="#formModal">Novo artigo</button> <!-- Article list --> <div infinite-scroll="loadMore()"> <section> <h1>Artigos cadastrados</h1> <article ng-repeat="article in articles | reverselist | limitTo:limit"> <h1>{{article.title}}, {{article.title | slugPattern}}</h1> <p>{{article.excerpt}}</p> <div class="btn-group" role="group" aria-label="..."> <button ng-click="showArticle(article)" data-toggle="modal" data-target="#formModal" type="button" class="btn btn-default">Visualizar</button> <button ng-click="editArticle(article)" data-toggle="modal" data-target="#formModal" type="button" class="btn btn-default">Editar</button> <button ng-click="removeArticle(article)" type="button" class="btn btn-default">Remove</button> </div> <a href="#" socialshare socialshare-provider="facebook" socialshare-text="720kb angular-socialshare" socialshare-url="http://720kb.net"> Share me on FB </a> <a href="#" socialshare socialshare-provider="google+" socialshare-url="http://my_page_url"> Share me G+ </a> <a href="#" socialshare socialshare-provider="twitter" socialshare-url="http://720kb.net" socialshare-hashtags="{{article.tags}}"> Share me on Twitter </a> </article> </section> </div> <!-- Modal --> <div id="formModal" class="modal fade" role="dialog"> <div class="modal-dialog"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title"> <span ng-if="currentArticle!==null">{{currentArticle.title}} | Artigo</span> <span ng-if="article.title!==\'\' && currentArticle===null">Editar {{article.title}}</span> <span ng-if="article.title===\'\' &&currentArticle===null">Novo Artigo</span> </h4> </div> <div class="modal-body"> <!-- Article input --> <form ng-if="currentArticle===null" ng-submit="sendArticle()"> Titulo: <input ng-required="true" placeholder="What needs to be written?" ng-model="article.title"> <br> Tags: <input ng-required="true" ng-model="article.tags"><br> Sum&aacute;rio: <textarea ng-model="article.excerpt" ng-required="true"></textarea><br> Conte&uacute;do: <textarea ng-model="article.content" ng-required="true"></textarea><br> <input type="submit" class="btn btn-primary" value="Add"> </form> <dl ng-if="currentArticle!==null"> <dd>Título</dd> <dt>{{currentArticle.title}}</dt> <dd>Sum&aacute;rio</dd> <dt>{{currentArticle.excerpt}}</dt> <dd>Conte&uacute;do:</dd> <dt>{{currentArticle.content}}</dt> </dl> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div></div>')}]);