'use strict';
module.exports = function(app) {
  var signup = require('../controllers/apiController');

   app.route('/signup')
   	.post(signup.create_new_user);

   app.route('/login')
   	.post(signup.login_email_password);

   app.route('/welcome/:user_email')
   	.get(signup.welcome_page);

   	//APIs required for Borrower
   	app.route('/borrower/:user_email')
   	  .post(signup.new_credit_request)
   	  .get(signup.all_credit_requests);

   	 //APIs required for Lender
   	 app.route('/lender/')
   	 	.get(signup.all_user_info_requests);
   	 app.route('/lender/:user_email/:id')
   	 	.put(signup.change_repayment);
  };