// [Style Y010]
(function() {
	'use strict';

	angular.module('articleModule')
		.config(['localStorageServiceProvider', function(localStorageServiceProvider){
		    localStorageServiceProvider.setPrefix('ls');
		}])
		.service('StorageService', StorageService)
		.service('ShareArticleService', ShareArticleService);

	function StorageService(localStorageService) {

		this.articles = localStorageService.get('articles') || [];

		this.add = function(article) {
			this.articles.push(article);
			localStorageService.set('articles', this.articles);
		};

		this.update = function(article) {
			this.articles.forEach(function(element) {
				if(element === article) {
					element.title= article.title;
					element.excerpt= article.excerpt;
					element.content= article.content;
					element.tags= article.tags;
				}
			});
		};

		this.list= function() {
			return this.articles || [];
		};
	}

	function ShareArticleService() {
		this.model = null;

		this.set= function(model) {
			this.model= model;
		};

		this.get= function() {
			return this.model;
		};
	}
})();