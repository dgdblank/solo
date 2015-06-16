var app = angular.module('app', [])

app.controller('SplitCtrl', function ($scope, Services) {

	// Roommates
	$scope.getRoommates = function(){
		Services.getRoommates()
			.then(function(roomies){
				$scope.roommates = roomies;
			})
	}

	$scope.addRoommate = function(person){
		Services.addRoommate({name: person})
		$scope.getRoommates();
		$scope.newPerson = '';
	};

	
	// Payments
	var splitCosts = function(payer, total){
		var cost = []
		var numRoomies = $scope.roommates.length || 1;
		for(var i = 0; i < numRoomies; i++){
			if($scope.roommates[i].name === payer){
				cost.push(0);
			} else {
				cost.push(total/numRoomies);
			}
		}

		return cost;
	}

	
	// Adds payment to database
	$scope.payment = {
		item: null,
		payer: null,
		total: null,
		cost: null
	};


	$scope.makePayment = function(){
		$scope.payment.cost = splitCosts($scope.payment.payer, $scope.payment.total);
		Services.addPayment($scope.payment);
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

	return {
		addPayment: addPayment,
		updateTable: updateTable,
		addRoommate: addRoommate,
		getRoommates: getRoommates
	};
})