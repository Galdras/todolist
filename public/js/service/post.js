		app.factory('postFactory', function($http, $q, $timeout){
			var factory = {
				posts : false,
				find : function() {
					var deferred = $q.defer();
					if(factory.posts !== false) {
						deferred.resolve(factory.posts);
					} else {
						$http.get('posts.json')
						.success(function(data,status){
							factory.posts = data;
							$timeout(function(data,status){
								deferred.resolve(factory.posts);
							}, 2000);
							
						}).error(function(data, status){
							deferred.reject('Impossible de recuperer les articles') ;
						});
					}

					return deferred.promise;
				},
				get : function(id) {
					var deferred = $q.defer();
					var post = {} ;
					var posts = factory.find().then(function(posts){
						angular.forEach(factory.posts, function(value,key) {
							if(value.id == id)
								post = value;	
						});
						deferred.resolve(post);
					}, function(msg){
						deferred.reject(msg) ;

					}) ;

					return deferred.promise;
				},
				add: function(comment) {
					var deferred = $q.defer() ;
					// ...
					deferred.resolve() ;
					return deferred.promise ;
				}
			} ;
			return factory;
		}) ;