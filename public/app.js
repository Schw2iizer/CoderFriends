var app = angular.module("CoderFriends", ["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
	.when("/home", {
		templateUrl: "/templates/home.html",
		controller: "homeController",
		resolve: {
			friends: function(githubService){
				return githubService.getFollowing();
			}
		}
	})
	.when("/friend/:github_username", {
		templateUrl: "/templates/friend.html",
		//controller: "friendController"
	})
	.otherwise('/')


})