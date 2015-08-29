// [Style Y010]
(function() {
	'use strict';

	angular.module('articleModule')
		.config(['localStorageServiceProvider', function(localStorageServiceProvider){
		    localStorageServiceProvider.setPrefix('ls');
		}])
		.service('StorageService', StorageService);

	function StorageService(localStorageService) {

		//var articlesInStore = localStorageService.get('articles');

		this.add = function(article) {
			console.log('adding', article);
		};
	}
})();