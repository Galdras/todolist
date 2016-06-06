		app.controller('todoCtrl', function($scope, todoFactory, $rootScope){
			$rootScope.loading = true ;

			$scope.newtodo = {} ;

			$scope.todos = todoFactory.query({},function(){
				$rootScope.loading = false ;
			});

			$scope.update = function(key){
				$scope.todos = todoFactory.update({'todoid' : $scope.todos[key]._id}, $scope.todos[key]) ;
			};

			$scope.add = function(){
				$scope.todos = todoFactory.save($scope.newtodo) ;
				$scope.newtodo = {} ;
			};

			$scope.delete = function(key){
				$scope.todos = todoFactory.delete({'todoid' : $scope.todos[key]._id}) ;
			};
		}) ;