Meteor.methods({
	'AddLineSuggestion': function(lineId, suggestedText) {
		var line = Lines.findOne(lineId);
		if (!line) {
			throw new Meteor.Error('not-found', 'Could not find line with specified ID.');
		}

		if (!_.isString(suggestedText) || suggestedText.length < 4) {
			throw new Meteor.Error('bad-request', 'Suggested text is invalid.');
		}

		Lines.update(line._id, {
			$addToSet: {
				'suggestions': {text: suggestedText}
			}
		})
	}
});
