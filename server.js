var express = require('express');
var db = require('./db.js');

var app = express();

app.get('/todolist', function(req,res) {
	db.getTodos().then(function(todos){
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
	db.updateTodo(req.params.id,req.body.summary,req.body.marked).then(function(todo){
		res.send(todo) ;
	});
});

app.delete('/todolist/:id', function(req,res) {
	db.deleteTodo(req.params.id).then(function(todos){
		res.send(todos) ;
	});
}); 

var server = app.listen(8090) ;