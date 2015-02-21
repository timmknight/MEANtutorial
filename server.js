var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (request, response) {
	console.log("Received GET request")

	db.contactlist.find(function (error, documents) {
		console.log(documents);
		response.json(documents);
	});

});
 
app.post('/contactlist', function (request, response) {
	console.log(request.body);
	db.contactlist.insert(request.body, function (error, documents) {
		response.json(documents);
	})
});

app.delete('/contactlist/:id', function (request, response){
	var id = request.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (error, documents) {
		response.json(documents);
	})
});

app.get('/contactlist/:id', function (request, response){
	var id = request.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (error, documents){
		response.json(documents);
	});
});

app.put('/contactlist/:id', function (request, response) {
	var id = request.params.id;
	console.log(request.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: request.body.name, email: request.body.email, number: request.body.number}},
		new: true}, function (error, documents) {
			response.json(documents);
		});
});

app.listen(3000);

console.log('Server running on port 3000');