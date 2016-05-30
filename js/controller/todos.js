		app.controller('todoCtrl', function($scope, todoFactory, $rootScope){
			$rootScope.loading = true ;
			$scope.todos = todoFactory.find().then(function(todos){
				$rootScope.loading = false ;
				$scope.todos = todos;
			}, function(msg){
				alert(msg) ;
			}) ;

			$scope.update = function(key){
				todoFactory.update($scope.todos[key]._id, $scope.todos[key].summary, $scope.todos[key].marked).then(function(){

				}, function(){
					alert('Votre TODO n\'a pas pu etre sauvegarde');
				})
			};
		}) ;