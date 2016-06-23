		app.controller('commentCtrl', function($scope, postFactory, $rootScope, $routeParams){

			$rootScope.loading = true ;
			$scope.newComment = {} ;


			postFactory.get($routeParams.id).then(function(post){
				$rootScope.loading = false ;
				$scope.title = post.name ;
				$scope.comments = post.comments ;
			}, function(msg){
				alert(msg);
			}) ;

			$scope.addComment = function(){
				$scope.comments.push($scope.newComment) ;

				postFactory.add($scope.newComment).then(function(){

				}, function(){
					alert('Votre message n\'a pas pu etre sauvegarde');
				})

				$scope.newComment = {} ;
			};

		}) ;