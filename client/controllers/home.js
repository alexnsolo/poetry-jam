angular.module('poetry-jam').controller('HomeCtrl', function($scope, $state, $meteor) {
	$scope.$meteorSubscribe('Poems');
	$scope.poems = $scope.$meteorCollection(Poems);

	$scope.createNewPoem = function() {
		$meteor.call('CreateNewPoem').then(function(poem) {
			$state.go('poem', {poemId: poem._id});
		});
	};
});
