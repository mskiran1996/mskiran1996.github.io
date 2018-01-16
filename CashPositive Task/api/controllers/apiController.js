'use strict';

var mongoose = require('mongoose'),
  SignUp = mongoose.model('SignUp');

exports.create_new_user = function(req, res) {
  var new_user = new SignUp(req.body);
  //console.log(req.body);
  SignUp.find({email:req.body.email},function (err, users) {
  if (err) return console.error(err);
  if(users.length){
  	res.send("Email is already Registered");
  }else {
  		new_user.save(function(err, user) {
    	if (err)
      		res.send(err);
    	res.json(user);
  	});
  }
});
};

exports.login_email_password = function(req, res) {
	var Login = mongoose.model('SignUp');
	var user_email = req.body.email;
	var user_password = req.body.password;
	//console.log(user_email);
	Login.find({$and: [{ email:user_email,password:user_password}]},function(err,loginSuccess){
		if(err)
			res.send(err);
		if(loginSuccess.length){
			//res.send("User authorized");
			res.redirect("welcome/"+user_email);
		}else {
			res.send("Incorrect Credentials");
		}
	});
};

exports.welcome_page = function(req, res) {
	var user_email = req.params.user_email;
	//console.log(req.params.user_email);
	res.send("Welcome,"+user_email);
};

exports.new_credit_request = function(req, res) {
	var user_email = req.params.user_email;
	 SignUp.update({$and: [{email:user_email,creditlimit:{$gt:parseInt(req.body.amount)}}]},{ $push: { 
	 										creditRequest:{
	 											amount:req.body.amount
	 											// repaymentdate:req.body.repaymentdate,
	 											//isRepaymentDone:req.body.isRepaymentDone
	 										}
	 									},
	 									$inc: {creditlimit:-(parseInt(req.body.amount))}
	 }, { upsert: true }, function(err,successMessage){
	 		if (err) {
	 			res.send(err);
	 		}
	 		//console.log(successMessage.nModified);
	 		if(successMessage.nModified){
      			res.redirect("/borrower/"+user_email);
      		}else {
      			res.send("Credit amount request is greater than credit limit.");
      		}
	 });
};

exports.all_credit_requests = function(req, res) {
	var user_email = req.params.user_email;
	SignUp.findOne({email:user_email},function(err,allRequests){
		if (err) {
	 			res.send(err);
	 		}
      		res.send(allRequests);
	});
};

exports.all_user_info_requests = function(req, res) {
	SignUp.find({roles:"borrower"},function(err,allUsersInfo){                //add roles:borrower
		if (err) {
	 			res.send(err);
	 		}
      		res.send(allUsersInfo);
	});
};

exports.change_repayment = function(req, res) {
	var id = req.params.id;
	var user_email = req.params.user_email;
	//console.log(typeof(id));
	SignUp.update({email:user_email},{ $set: { "creditRequest.0.isRepaymentDone":"Yes" }}, { upsert: true },
	function(err,allUsersInfo){
		//console.log(allUsersInfo);
		if (err) {
	 		res.send(err);
	 	}
      	else {res.send(allUsersInfo);}
	});
};