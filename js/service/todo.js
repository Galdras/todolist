		app.factory('todoFactory', function($http, $q, $resource){
			return $resource('http://localhost:8090/todolist/:todoid', null,
			{
				'get':    {method:'GET'},
				'save':   {method:'POST'},
				'query':  {method:'GET', isArray:true},
				'remove': {method:'DELETE'},
				'delete': {method:'DELETE'},
				'update': {method:'PUT'}
			});

		}) ;