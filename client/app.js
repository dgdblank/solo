var app = angular.module('app', [])

app.controller('SplitCtrl', function ($scope, Services) {
	$scope.cost;

	$scope.addRoommate = function(person){
		Services.addRoommate({name: person})
			.then(function(){
				$scope.getRoommates();
			})
		$scope.newPerson = '';
	};

	var applyRemoteRoomies = function(roomies){
		$scope.roommates = roomies;
	}

	$scope.getRoommates = function(){
		Services.getRoommates()
			.then(function(roomies){
				applyRemoteRoomies(roomies);
			})
	}

	// var splitCosts = function(total){
	// 	var cost = []
	// 	var numRoomies = $scope.roomates.length || null;
	// 	for(var i = 0; i < numRoomies; i++){
	// 		cost.push(total/numRoomies);
	// 	}

	// 	return cost;
	// }

	
	// Adds payment to database
	$scope.payment = {
		item: null,
		payer: null,
		total: null,
	};

	$scope.makePayment = function(){
		// $scope.payment.cost = splitCosts($scope.payment.total);
		Services.addPayment($scope.payment);
		$scope.payment = {
			item: null,
			payer: null,
			total: null,
		}
		$scope.updateTable();
	}

	// gets data from database and populates payment table
	$scope.updateTable = function(){
		Services.updateTable()
			.then(function(data){
				$scope.output = data;
			})
	};

$scope.updateTable();
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