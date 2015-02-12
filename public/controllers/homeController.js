var app = angular.module("CoderFriends");

app.controller("homeController", function($scope, friends){
	$scope.friends = friends;
})