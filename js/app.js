		var app = angular.module('comment', ['ngRoute', 'ngResource']);
		app.config( function($routeProvider) {
			$routeProvider
				.when('/',         {templateUrl: 'partials/home.html',
									controller : 'todoCtrl'})
				.otherwise(        {redirectTo : '/'});
		}) ;