var app = angular.module("CoderFriends");

app.service("githubService", function($http, $q) {

    this.getFollowing = function() {
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: "/api/github/following"
        }).then(function(res) {
            console.log(res);
            deferred.resolve(res);
        }, function(err){
        	console.log(err);
        })	
        return deferred.promise;
    }
})
