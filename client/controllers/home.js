angular.module('poetry-jam').controller('HomeCtrl', function($scope, $meteor) {
	$scope.$meteorSubscribe('Poems');
	$scope.poems = $scope.$meteorCollection(Poems);

	$scope.createNewPoem = function() {
		$meteor.call('CreateNewPoem').then(function(poem) {
			console.log(poem);
		});
	};
});
