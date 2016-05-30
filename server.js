var express = require('express');
var db = require('./db.js');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/todolist', function(req,res) {
	db.getTodos().then(function(todos){
		res.header()
		res.send(todos) ;
	});
});

app.put('/todolist', function(req,res) {
	db.addTodo(req.body.userid, req.body.summary).then(function(todos){
		res.send(todos) ;
	});
});

app.get('/todolist/:id', function(req,res) {
	db.getTodo(req.params.id).then(function(todo){
		res.send(todo) ;
	});
});

app.post('/todolist/:id', function(req,res) {
	console.log(req.body) ;
	db.updateTodo(req.params.id,req.body.summary,req.body.marked).then(function(todos){
		res.send(todos) ;
	});
});

app.delete('/todolist/:id', function(req,res) {
	db.deleteTodo(req.params.id).then(function(todos){
		res.send(todos) ;
	});
}); 

var server = app.listen(8090) ;