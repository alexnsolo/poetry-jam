angular.module('poetry-jam').controller('PoemCtrl', function($scope, $rootScope, $stateParams, $meteor) {
	$scope.$meteorSubscribe('Poem', $stateParams.poemId);
	$scope.poem = $scope.$meteorObject(Poems, $stateParams.poemId);

	$scope.$meteorSubscribe('Lines', $stateParams.poemId);
	$scope.lines = $scope.$meteorCollection(Lines);

	$scope.isPoemOwner = function() {
		if (!$rootScope.currentUser) {
			return false;
		}
		if (!$scope.poem) {
			return false;
		}
		return $scope.poem.ownerId === $rootScope.currentUser._id;
	};

	$scope.addNewLine = function() {
		var line = {};
		line.text = '';
		line.type = 'text';
		line.ownerId = $rootScope.currentUser._id;
		line.poemId = $stateParams.poemId;
		line.createdAt = Date.now();
		line._id = Lines.insert(line);
	};

	$scope.addNewBreak = function() {
		var line = {};
		line.type = 'break';
		line.ownerId = $rootScope.currentUser._id;
		line.poemId = $stateParams.poemId;
		line.createdAt = Date.now();
		line._id = Lines.insert(line);
	};
});
