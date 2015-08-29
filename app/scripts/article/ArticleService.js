// [Style Y010]
(function() {
	'use strict';

	angular.module('articleModule')
		.config(['localStorageServiceProvider', function(localStorageServiceProvider){
		    localStorageServiceProvider.setPrefix('ls');
		}])
		.service('StorageService', StorageService);

	function StorageService(localStorageService) {

		this.articles = localStorageService.get('articles') || [];

		this.add = function(article) {
			this.articles.push(article);
			localStorageService.set('articles', this.articles);
		};

		this.list= function() {
			return this.articles || [];
		};
	}
})();