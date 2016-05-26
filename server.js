var express = require('express');
var db = require('./db.js');

var app = express();

app.get('/todolist', function(req,res) {
	console.log('getTodos : ' + db.getTodos()) ;
	res.send(db.getTodos());
});

/*app.post('/todolist', function(req,res) {
	res.send(db.addTodo(req.body.userid, req.body.summary)) ;
});

app.get('/todolist/:id', function(req,res) {
	res.send(db.getTodos(req.params.id));
});*/

var server = app.listen(8090) ;