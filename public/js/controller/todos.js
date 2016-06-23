		app.controller('todoCtrl', function($scope, todoFactory, $rootScope){
			$rootScope.loading = true ;

			$scope.newtodo = {} ;

			$scope.todos = todoFactory.query({},function(){ $rootScope.loading = false ;});

			$scope.update = function(index){
				todoFactory.update({'todoid' : $scope.todos[index]._id}, $scope.todos[index]) ;
				$scope.todos = todoFactory.query({},function(){ $rootScope.loading = false ;});
			};

			$scope.add = function(){
				todoFactory.save($scope.newtodo) ;
				$scope.newtodo = {} ;
				$scope.todos = todoFactory.query({},function(){ $rootScope.loading = false ;});
			};

			$scope.delete = function(index){
				todoFactory.delete({'todoid' : $scope.todos[index]._id}) ;
				$scope.todos = todoFactory.query({},function(){ $rootScope.loading = false ;});
			};
		}) ;