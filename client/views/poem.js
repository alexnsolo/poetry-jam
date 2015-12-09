angular.module('poetry-jam').controller('PoemCtrl', function($scope, $q, $rootScope, $stateParams, $meteor) {
	$scope.poem = $scope.$meteorObject(Poems, $stateParams.poemId);
	$scope.lines = $scope.$meteorCollection(Lines);

	$scope.loading = true;

	$q.all([
		$scope.$meteorSubscribe('Lines', $stateParams.poemId),
		$scope.$meteorSubscribe('Poem', $stateParams.poemId)
	])
		.then(function() {
			$scope.loading = false;
		});

	$scope.isPoemOwner = function() {
		if (!$rootScope.currentUser) {
			return false;
		}
		if (!$scope.poem) {
			return false;
		}
		return $scope.poem.ownerId === $rootScope.currentUser._id;
	};

	$scope.finalizePoem = function() {
		Poems.update($stateParams.poemId, {
			$set: {
				'isFinalized': true
			}
		});
	};

	$scope.addNewLine = function() {
		var line = {};
		line.type = 'text';
		line.text = '';
		line.suggestions = [];
		line.isFinalized = false;
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
