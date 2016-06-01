		app.controller('todoCtrl', function($scope, todoFactory, $rootScope){
			$rootScope.loading = true ;

			$scope.todos = todoFactory.query({},function(){
				$rootScope.loading = false ;
			});

			$scope.update = function(key){
				$scope.todos = todoFactory.update({'todoid' : $scope.todos[key]._id}, $scope.todos[key]) ;
			};
		}) ;