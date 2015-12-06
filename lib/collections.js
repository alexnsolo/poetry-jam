Poems = new Mongo.Collection('poems');
Lines = new Mongo.Collection('lines');

Poems.allow({
	insert: function (userId, poem) {
		// You can only create poems owned by your self
		return userId && poem.ownerId === userId;
	},
	update: function (userId, poem, fields, modifier) {
		// You can only update poems owned by your self
		return userId && poem.ownerId === userId;
	}
});

Lines.allow({
	insert: function (userId, line) {
		poem = Poems.findOne(line.poemId);

		// Inserting lines without a poem is not allowed
		if (!poem) {
			return false;
		}

		// Inserting lines into someone else's poem is not alowed
		if (poem.ownerId !== userId) {
			return false;
		}

		// You can only insert lines owned by your self
		return userId && line.ownerId === userId;
	},
	update: function (userId, line, fields, modifier) {
		// Moving lines between poems is not allowed
		if (_.contains(fields, 'poem')) {
			return false;
		}

		// You can only update lines owned by your self
		return userId && line.ownerId === userId;
	},
	remove: function (userId, line) {
		// You can only remove lines owned by your self
		return userId && line.ownerId === userId;
	}
});
