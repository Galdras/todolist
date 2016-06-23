		app.controller('postCtrl', function($scope, postFactory, $rootScope){
			$rootScope.loading = true ;
			$scope.posts = postFactory.find().then(function(posts){
				$rootScope.loading = false ;
				$scope.posts = posts;
			}, function(msg){
				alert(msg) ;
			}) ;
		}) ;