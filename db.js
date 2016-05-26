var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolist');

var todoSchema = new mongoose.Schema({
	userID : mongoose.Schema.ObjectId,
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
	var db = mongoose.connection;

	db.on('error',console.error.bind(console,'Connection error:')) ;
	db.once('open',function() {
		console.log('Connection to DB : success');
	}) ;
} ;


var closedb = function() {
	mongoose.connection.close() ;
};

var userExist = function(_userid) {
	// todo check exist user
	return true ;
}

var addTodo = function(_userid, _summary) {
	initdb() ;

	if(userExist(_userid) !== true) { throw "User does not exist ..." ;}

	var newtodo = new todoModel({summary : _summary, userID : _userid, marked : false});

	newtodo.save(function (err) {
		if(err) { throw err ;}
		console.log('Add new Todo : ' + _summary) ;
	});

	closedb() ;

	return newtodo ;
};

var updateTodo = function(_todoid , _summary , _marked) {
	initdb() ;

	todoModel.update({_id : _todoid}, {summary : _summary, marked : _marked}, {multi : false}, function(err) {
		if(err) { throw err ;}
		console.log('Update todo : ' + _summary + ' , marked : ' + _marked) ;
	});

	closedb() ;
};

var getTodo = function(_todoid) {
	initdb() ;

	var query = todoModel.find(null) ;
	query.where('_id', _todoid) ;
	query.exec(function(err, todo) {
		if(err) { throw err ; }
		closedb() ;
		return todo ;
	});
	
};

var getTodos = function() {
	initdb() ;

	var query = todoModel.find(null) ;
	query.exec(function(err, todos) {
		if(err) { throw err ; }
		closedb() ;
		return todos ;
	});
	
};

exports.addTodo = addTodo ;
exports.updateTodo = updateTodo ;
exports.getTodo = getTodo ;
exports.getTodos = getTodos ;