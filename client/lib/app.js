angular.module('poetry-jam', [
	'angular-meteor',
	'ui.router',
	'accounts.ui'
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
			templateUrl: 'client/views/home.html',
			controller: 'HomeCtrl'
		})
		.state('poem', {
			url: '/poem/:poemId',
			templateUrl: 'client/views/poem.html',
			controller: 'PoemCtrl'
		});
});
