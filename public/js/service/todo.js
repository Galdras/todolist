		app.factory('todoFactory', function($http, $q, $resource){
			return $resource('http://localhost:8090/todolist/:todoid', null,
			{
				'get':    {method:'GET'},
				'save':   {method:'POST', isArray:true},
				'query':  {method:'GET', isArray:true},
				'remove': {method:'DELETE'},
				'delete': {method:'DELETE', isArray:true},
				'update': {method:'PUT', isArray:true}
			});

		}) ;