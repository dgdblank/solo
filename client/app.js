var app = angular.module('app', [])

app.controller('SplitCtrl', function ($scope, Services) {
	$scope.roommates;


	// Roommates
	$scope.getRoommates = function(){
		Services.getRoommates()
			.then(function(roomies){
				$scope.roommates = roomies;
			})
	}

	$scope.addRoommate = function(person){
		Services.addRoommate({name: person})
			.then(function(){
				$scope.getRoommates();
			})
		$scope.newPerson = '';
	};

	
	// Payments
	var splitCosts = function(total){
		var cost = []
		var numRoomies = $scope.roommates.length || 1;
		for(var i = 0; i < numRoomies; i++){
			cost.push(total/numRoomies);
		}

		return cost;
	}

	
	// Adds payment to database
	$scope.payment = {
		item: null,
		payer: null,
		total: null,
	};
	var cost = {
		split: null
	}


	$scope.makePayment = function(){
		cost.split = splitCosts($scope.payment.total);
		Services.addPayment($scope.payment);
		Services.splitCost(cost);

		// return to null
		$scope.payment = {
			item: null,
			payer: null,
			total: null,
		}
		$scope.getPayments();
	}

	// gets data from database and populates payment table
	$scope.getPayments = function(){
		Services.updateTable()
			.then(function(data){
				$scope.output = data;
			})
		Services.getSplit()
			.then(function(costs){
				$scope.costs = costs;
			})
	};

$scope.getPayments();
$scope.getRoommates();
});

app.service('Services', function ($http) {
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

	var addRoommate = function(roommate){
		return $http({
			method: 'POST',
			url: '/api/roommate',
			data: roommate
		});
	};

	var getRoommates = function(){
		return $http({
			method: 'GET',
			url: '/api/roommate'
		})
		.then(function (resp){
			return resp.data;
		});
	};

	var splitCost = function(cost){
		return $http({
			method: 'POST',
			url: '/api/cost',
			data: cost
		});
	};

	var getSplit = function(){
		return $http({
			method: 'GET',
			url: '/api/cost'
		})
		.then(function (resp){
			return resp.data;
		});
	};

	return {
		addPayment: addPayment,
		updateTable: updateTable,
		addRoommate: addRoommate,
		getRoommates: getRoommates,
		splitCost: splitCost,
		getSplit: getSplit
	};
})