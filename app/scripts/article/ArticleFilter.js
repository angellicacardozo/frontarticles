(function() {
	'use strict';

	angular.module('articleModule')
		.filter('slugPattern', decorateTitle);

	function decorateTitle() {
		return function(title){
			return title.toLowerCase()
				.replace(/[^\w ]+/g,'')
				.replace(/ +/g,'-');
		}
	}
})();