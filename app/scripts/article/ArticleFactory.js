(function() {
	'use strict';

	angular.module('articleModule')
		.factory('flash', flash);

	function flash($rootScope, toastr) {
		  var queue = [];

		  return {
		    setMessage: function(message, type) {
		      queue.push({ 'message': message, 'type': type });
		    },
		    getMessage: function() {
		    	return queue.shift() || null;
		    },
		    showMessage: function() {
		    	var crrMessage= this.getMessage();

		    	if(crrMessage===null) {
		    		return;
		    	}

		    	switch(crrMessage.type) {
		    		case 'info':
		    			 toastr.info(crrMessage.message, 'Informação...');
		    			break;
		    		case 'success':
		    			 toastr.success(crrMessage.message, 'Sucesso...');
		    			break;
		    		default:
		    			// toastr.info(crrMessage.message, 'Informação...');
		    	}
		    }
		  };
	}
})();