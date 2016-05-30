		app.factory('todoFactory', function($http, $q){
			var factory = {
				todos : false,
				find : function() {
					var deferred = $q.defer();
					if(factory.todos !== false) {
						deferred.resolve(factory.todos);
					} else {
						$http.get('http://localhost:8090/todolist')
						.success(function(data,status){
							factory.todos = data;
							deferred.resolve(factory.todos);							
						}).error(function(data, status){
							deferred.reject('Impossible de recuperer la liste des TODOS') ;
						});
					}

					return deferred.promise;
				},
				get : function(id) {
					var deferred = $q.defer();
					var post = {} ;
					var todos = factory.find().then(function(todos){
						angular.forEach(factory.todos, function(value,key) {
							if(value._id == id)
								todo = value;	
						});
						deferred.resolve(todo);
					}, function(msg){
						deferred.reject(msg) ;

					}) ;

					return deferred.promise;
				},
				add: function(_summary) {
					var deferred = $q.defer();
					$http.put('http://localhost:8090/todolist', {userID : 1, summary :  _summary})
						.success(function(data,status){
							factory.todos = data;
							deferred.resolve(factory.todos);							
						}).error(function(data, status){
							deferred.reject('Impossible d\'ajouter un TODO') ;
						});
				},
				update: function(_id,_summary,_marked) {
					var deferred = $q.defer();
					var data = JSON.stringify({summary :  _summary , marked : _marked }) ;
					$http.post('http://localhost:8090/todolist/' + _id, data)
						.success(function(data,status){
							factory.todos = data;
							deferred.resolve(factory.todos);							
						}).error(function(data, status){
							deferred.reject('Impossible d\'ajouter un TODO') ;
						});
				}
			} ;
			return factory;
		}) ;