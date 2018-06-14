var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NYTSavedArticlesSchema object
// This is similar to a Sequelize model
var NYTSavedArticlesSchema = new Schema({
	// `headline.main` is required and of type String
	headline: {
		type: String,
		required: true,
	},
	// `snippet` is required and of type String
	snippet: {
		type: String,
		required: true,
	},
	web_url: {
		type: String,
		required: true,
	},
	// `source` is required and of type String
	source: {
		type: String,
		required: true,
	},
	pub_date: {
		type: Date,
		required: true,
	},

	// `comment` is an object that stores a Comment id
	// The ref property links the ObjectId to the Comment model
	// This allows us to populate the SacBeeLatest with an associated Comment
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
});

// This creates our model from the above schema, using mongoose's model method
var NYTSavedArticles = mongoose.model(
	'NYTSavedArticles',
	NYTSavedArticlesSchema
);

// Export the NYTSavedArticles model
module.exports = NYTSavedArticles;
