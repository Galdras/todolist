		var app = angular.module('comment', ['ngRoute']);
		app.config( function($routeProvider) {
			$routeProvider
				.when('/',         {templateUrl: 'partials/home.html',
									controller : 'todoCtrl'})
				.otherwise(        {redirectTo : '/'});
		}) ;