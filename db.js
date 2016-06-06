var mongoose = require('mongoose');


var todoSchema = new mongoose.Schema({
	summary : String,
	marked : Boolean
});

var todoModel = mongoose.model('todos', todoSchema);

var userSchema = new mongoose.Schema({
	userID : mongoose.Schema.ObjectId,
	name : String,
	surname : String
});

var userModel = mongoose.model('users', userSchema);

var initdb = function() {
	mongoose.connect('mongodb://localhost:27017/todolist');
	var db = mongoose.connection;

	db.on('error',function (err) {
		console.log('Connection error:' + err)
	}) ;
	db.once('open',function() {
		console.log('Connection to DB : success');
	}) ;
} ;


var closedb = function() {
	console.log('Connection closed ...') ;
	mongoose.connection.close() ;
};


var addTodo = function(_summary) {

	var newtodo = new todoModel({summary : _summary, marked : false});

	newtodo.save(function (err) {
		if(err) { throw err ;}
		console.log('Add new Todo : ' + _summary) ;
	});

	return getTodos() ;
};

var updateTodo = function(_todoid , _summary , _marked) {
	todoModel.update({_id : _todoid}, {summary : _summary, marked : _marked}, {multi : false}, function(err) {
		if(err) { throw err ;}
		console.log('Update todo : ' + _summary + ' , marked : ' + _marked) ;
	});

	return getTodos() ;
};

var deleteTodo = function(_todoid) {
	todoModel.remove({_id : _todoid}, function(err) {
		if(err) { throw err ;}
		console.log('Delete todo : ' + _todoid) ;
	});

	return getTodos() ;
};

var getTodo = function(_todoid) {
	var query = todoModel.find() ;
	query.where('_id', _todoid) ;
	var promise = query.exec();
	return promise ;
};

var getTodos = function() {

	var query = todoModel.find() ;
	var promise = query.exec();
	return promise ;
};


initdb() ;

exports.addTodo = addTodo ;
exports.updateTodo = updateTodo ;
exports.deleteTodo = deleteTodo ;
exports.getTodo = getTodo ;
exports.getTodos = getTodos ;