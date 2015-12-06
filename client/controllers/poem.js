angular.module('poetry-jam').controller('PoemCtrl', function($scope, $rootScope, $stateParams, $meteor) {
	$scope.$meteorSubscribe('Poem', $stateParams.poemId);
	$scope.poem = $scope.$meteorObject(Poems, $stateParams.poemId);

	$scope.isPoemOwner = function() {
		if (!$rootScope.currentUser) {
			return false;
		}
		if (!$scope.poem) {
			return false;
		}
		return $scope.poem.owner === $rootScope.currentUser._id;
	};
});
