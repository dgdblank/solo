angular.module('app.factory', [])

.factory('Payments', function ($http) {
	var addPayment = function(){
		return $http({
			method: 'GET',
			url: '/api/payment'
		})
		.then(function(resp){
			return resp.data;
		});
	};

	var updateTable = function(payment){
		return $http({
			method: 'POST',
			url: '/api/payment'
			data: payment
		});
	};

	return {
		addPayment: addPayment,
		updateTable: updateTable
	};
})