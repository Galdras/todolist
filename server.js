var express = require('express');
var db = require('./db.js');
var bodyparser = require('body-parser');
const path = require('path') ;

var app = express();

app.use(bodyparser.json());


app.use(express.static(path.join(__dirname,'public'))) ;
app.use(express.static('./public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


app.get('/todolist', function(req,res) {
	db.getTodos().then(function(todos){
		console.log('All GET called') ;
		//res.send(todos) ;
		res.status(200).json(todos) ;
	});
});

app.post('/todolist', function(req,res) {
	db.addTodo(req.body.summary).then(function(todos){
		console.log('POST called') ;
		//res.send(todos) ;
		res.status(201).json(todos) ;
	});
});

app.get('/todolist/:id', function(req,res) {
	db.getTodo(req.params.id).then(function(todos){
		console.log('Simple GET called') ;
		//res.send(todo) ;
		res.status(200).json(todos) ;
	});
});

app.put('/todolist/:id', function(req,res) {
	db.updateTodo(req.params.id,req.body.summary,req.body.marked).then(function(todos){
		console.log('PUT called') ;
		//res.send(todos) ;
		res.status(204).json(todos) ;
	});
});

app.delete('/todolist/:id', function(req,res) {
	db.deleteTodo(req.params.id).then(function(todos){
		console.log('DELETE called') ;
		//res.send(todos) ;
		res.status(204).json(todos) ;
	});
});

app.route('/*').get(function(req, res) {
	res.sendFile('index.html') ;
});

var server = app.listen(process.env.PORT || 8090) ;
//var server = app.listen(8090) ;