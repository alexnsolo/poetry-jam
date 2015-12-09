angular.module('poetry-jam').controller('HomeCtrl', function($scope, $rootScope, $state, $meteor) {
	$scope.poems = $scope.$meteorCollection(Poems, false);

	$scope.loading = true;
	$scope.$meteorSubscribe('Poems')
		.then(function() {
			$scope.loading = false;
		});

	$scope.createNewPoem = function() {
		if (!$rootScope.currentUser) {
			return;
		}

		var poem = {};
		poem.name = '';
		poem.isFinalized = false;
		poem.author = $rootScope.currentUser.emails[0].address;
		poem.ownerId = $rootScope.currentUser._id;
		poem.createdAt = Date.now();
		poem._id = Poems.insert(poem);
		$state.go('poem', {poemId: poem._id});
	};
});
