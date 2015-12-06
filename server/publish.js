Meteor.publish('Poems', function() {
	return Poems.find();
});

Meteor.publish('Poem', function(poemId) {
	return Poems.find({_id: poemId});
});

Meteor.publish('Lines', function(poemId) {
	return Lines.find({poemId: poemId});
});
