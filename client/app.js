var app = angular.module('app', [])

app.controller('SplitCtrl', function ($scope) {
	$scope.roommates = [];

	$scope.addRoommate = function(person){
		$scope.roommates.push(person);
		$scope.newPerson = '';
	}
});