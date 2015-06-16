angular.module('app.services', [])

.services('Payments', function ($http) {
	var addPayment = function(){
		return $http({
			method: 'GET',
			url: '/payment'
		})
		.then(function(resp){
			return resp.data;
		});
	};

	var updateTable = function(){
		return $http({
			method: 'POST',
			url: '/payment'
			data: json
		});
	};

	return {
		addPayment: addPayment,
		updateTable: updateTable
	};
})