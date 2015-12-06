angular.module('poetry-jam').controller('HomeCtrl', function($scope, $rootScope, $state, $meteor) {
	$scope.$meteorSubscribe('Poems');
	$scope.poems = $scope.$meteorCollection(Poems);

	$scope.createNewPoem = function() {
		if (!$rootScope.currentUser) {
			return;
		}

		var poem = {};
		poem.name = '';
		poem.author = $rootScope.currentUser.email;
		poem.owner = $rootScope.currentUser._id;
		poem._id = Poems.insert(poem);
		$state.go('poem', {poemId: poem._id});
	};
});
