angular.module('poetry-jam').directive('poemLine', function($meteor) {
	return {
		restrict: 'E',
		templateUrl: 'client/components/poem-line.html',
		controller: function($scope) {
			$scope.addSuggestion = function(line) {
				var text = line.$newSuggestionText;
				if (_.isEmpty(text)) {
					return;
				}

				$meteor.call('AddLineSuggestion', line._id, text).then(function() {
					line.$newSuggestionText = '';
				});
			};

			$scope.chooseSuggestion = function(line, suggestion) {
				Lines.update(line._id, {
					$set: {
						'text': suggestion.text,
						'isFinalized': true
					}
				});
			};
		}
	};
});
