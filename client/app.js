var app = angular.module('app', [])

app.controller('SplitCtrl', function ($scope, Payments) {
	$scope.roommates = [];

	$scope.addRoommate = function(person){
		$scope.roommates.push(person);
		$scope.newPerson = '';
	};

	$scope.payment = {
		item: null,
		payer: null,
		cost: null
	};

	$scope.makePayment = function(){
		Payments.addPayment($scope.payment);
		$scope.payment = {
			item: null,
			payer: null,
			cost: null
		}
		$scope.updateTable();
	}

	
	$scope.updateTable = function(){
		Payments.updateTable()
			.then(function(data){
				$scope.output = data;
			})
	};

$scope.updateTable();
});

app.service('Payments', function ($http) {
	var updateTable = function(){
		return $http({
			method: 'GET',
			url: '/api/payment'
		})
		.then(function (resp){
			return resp.data;
		});
	};

	var addPayment = function(payment){
		return $http({
			method: 'POST',
			url: '/api/payment',
			data: payment
		});
	};

	return {
		addPayment: addPayment,
		updateTable: updateTable
	};
})