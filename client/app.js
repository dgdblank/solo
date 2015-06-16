var app = angular.module('app', [
	'ngTable'])

app.controller('SplitCtrl', function ($scope, ngTableParams, Payments) {
	$scope.roommates = [];

	$scope.addRoommate = function(person){
		$scope.roommates.push(person);
		$scope.newPerson = '';
	};

	$scope.payment = {
		item: '',
		payer: '',
		cost: ''
	};

	$scope.makePayment = function(){
		Payments.addPayment($scope.payment);
		$scope.payment = {
			item: '',
			payer: '',
			cost: ''
		}
	}

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10
	}, {
		getData: function($defer, params) {
			$defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	})
	
	var data = [{name: "Moroni", age: 50},
                {name: "Tiancum", age: 43},
                {name: "Jacob", age: 27},
                {name: "Nephi", age: 29},
                {name: "Enos", age: 35}];
});

app.service('Payments', function ($http) {
	var updateTable = function(){
		return $http({
			method: 'GET',
			url: '/api/payment'
		})
		.then(function(resp){
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