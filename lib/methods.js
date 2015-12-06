Meteor.methods({
	'CreateNewPoem': function() {
		if (!Meteor.userId()) {
			throw new Meteor.Error('security', 'Not authorized.');
		}

		var poem = {};
		poem.name = '';
		poem.author = Meteor.user().email;
		poem.owner = Meteor.userId();
		poem._id = Poems.insert(poem);

		return poem;
	}
});
