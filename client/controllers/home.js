angular.module('poetry-jam').controller('HomeCtrl', function($scope, $rootScope, $state, $meteor) {
	$scope.$meteorSubscribe('Poems');
	$scope.poems = $scope.$meteorCollection(Poems, false);

	$scope.createNewPoem = function() {
		if (!$rootScope.currentUser) {
			return;
		}

		var poem = {};
		poem.name = '';
		poem.author = $rootScope.currentUser.emails[0].address;
		poem.ownerId = $rootScope.currentUser._id;
		poem.createdAt = Date.now();
		poem._id = Poems.insert(poem);
		$state.go('poem', {poemId: poem._id});
	};
});
