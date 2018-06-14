var express = require('express');
var router = express.Router();

var request = require('request');

// Require all models
var db = require('../models');

const nytURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

// Routes

// A post route for scraping the echoJS website
router.post('/search', function(req, res) {
	// First, we grab the body of the html with request
	request.get(
		{
			url: nytURL,
			qs: {
				'api-key': 'db88f4c617ed41e1a9b08bcb955573e4',
				q: req.body.q,
				begin_date: req.body.begin_date,
				end_date: req.body.end_date,
				sort: req.body.sort,
				page: req.body.page,
			},
		},
		function(err, response, body) {
			if (err) return res.json(err);

			body = JSON.parse(body);

			var docs = [];

			body.response.docs.map((doc) => {
				let trimmedDoc = {
					snippet: doc.snippet,
					pub_date: doc.pub_date,
					headline: doc.headline.main,
					web_url: doc.web_url,
					source: doc.source,
				};
				docs.push(trimmedDoc);
			});
			return res.json(docs);
		}
	);
});

// Route for getting all Articles from the db
router.get('/saved', function(req, res) {
	// Grab every document in the Articles collection
	db.NYTSavedArticles.find({ isSaved: true })
		.sort({ _id: -1 })
		.limit(20)
		.then(function(dbNYTSavedArticles) {
			// If we were able to successfully find Articles, send them back to the client
			res.json(dbNYTSavedArticles);
		})
		.catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});

// Route for saving/updating an Article's associated Comment
router.put('/save/:id', function(req, res) {
	// Create a new Comment and pass the req.body to the entry
	db.NYTSavedArticles.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(function(dbNYTSavedArticles) {
			// If we were able to successfully update an Article, send it back to the client
			res.json(dbNYTSavedArticles);
		})
		.catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});

// Route for grabbing a specific Article by id, populate it with it's Comment
router.get('/latest/saved/comments/:id', function(req, res) {
	// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
	db.NYTSavedArticles.findOne({ _id: req.params.id })
		// ..and populate all of the Comments associated with it
		.populate({ path: 'comments', options: { sort: { _id: -1 } } })
		.then(function(dbNYTSavedArticles) {
			// If we were able to successfully find an Article with the given id, send it back to the client
			res.json(dbNYTSavedArticles);
		})
		.catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});

// Route for saving/updating an Article's associated Comment
router.post('/latest/saved/comment/:id', function(req, res) {
	// Create a new Comment and pass the req.body to the entry
	db.Comment.create(req.body)
		.then(function(dbComment) {
			// If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Comment
			// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
			// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
			return db.NYTSavedArticles.findOneAndUpdate(
				{ _id: req.params.id },
				{ $push: { comments: dbComment._id } },
				{ new: true }
			);
		})
		.then(function(dbNYTSavedArticles) {
			// If we were able to successfully update an Article, send it back to the client
			res.json(dbNYTSavedArticles);
		})
		.catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});

router.delete('/saved/:id/comment/:comm_id', (req, res) => {
	db.Comment.findByIdAndRemove(req.params.comm_id)
		.then((dbComment) => {
			return db.NYTSavedArticles.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $pull: { comments: dbComment._id } },
				{ new: true }
			);
		})
		.then((dbNYTSavedArticles) => {
			const response = {
				message: 'Comment successfully deleted',
			};
			return res.status(200).send(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
