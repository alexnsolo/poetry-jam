Poems = new Mongo.Collection('poems');

Poems.allow({
	update: function (userId, poem, fields, modifier) {
		return userId && poem.owner === userId;
	}
});
