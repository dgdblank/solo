angular.module('app', [
	'ngTable'])

.controller('SplitCtrl', function ($scope, ngTableParams) {
	$scope.roommates = [];

	$scope.addRoommate = function(person){
		$scope.roommates.push(person);
		$scope.newPerson = '';
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