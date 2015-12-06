Poems = new Mongo.Collection('poems');

Poems.allow({
	insert: function (userId, poem) {
		return userId && poem.owner === userId;
	},
	update: function (userId, poem, fields, modifier) {
		return userId && poem.owner === userId;
	},
	remove: function (userId, party) {
		return userId && poem.owner === userId;
	}
});
