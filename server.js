var express = require('express');
var db = require('./db.js');
var bodyparser = require('body-parser');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  bodyparser.json() ;
  next();
});


app.get('/todolist', function(req,res) {
	db.getTodos().then(function(todos){
		console.log('All GET called') ;
		res.send(todos) ;
	});
});

app.post('/todolist', function(req,res) {
	db.addTodo(req.body.userid, req.body.summary).then(function(todos){
		console.log('POST called') ;
		res.send(todos) ;
	});
});

app.get('/todolist/:id', function(req,res) {
	db.getTodo(req.params.id).then(function(todo){
		console.log('Simple GET called') ;
		res.send(todo) ;
	});
});

app.put('/todolist/:id', function(req,res) {
	console.log(req);
	db.updateTodo(req.params.id,req.body.summary,req.body.marked).then(function(todos){
		console.log('PUT called') ;
		res.send(todos) ;
	});
});

app.delete('/todolist/:id', function(req,res) {
	db.deleteTodo(req.params.id).then(function(todos){
		console.log('DELETE called') ;
		res.send(todos) ;
	});
}); 

var server = app.listen(8090) ;