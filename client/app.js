angular.module('poetry-jam', [
	'angular-meteor',
	'ui.router'
]);

angular.module('poetry-jam').run(function() {
	console.log('Poetry Jam initialized.');
});

angular.module('poetry-jam').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'client/templates/home.html'
		});
});
