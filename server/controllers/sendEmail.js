
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const helper = require('sendgrid').mail;
const API = require('../../config/development.json')
const sg = require('sendgrid')(API.SENDGRID.key);


module.exports.emailUser = function(req, res) {
	var fromEmail = new helper.Email('CarGo@cargo.com');
	var toEmail = new helper.Email(req.body.email);
	var subject = 'Bill would like to catch a ride with you';
	var content = new helper.Content('text/plain', 'Sign into CarGo to accept a new rider');
	var mail = new helper.Mail(fromEmail, subject, toEmail, content);

	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: mail.toJSON()
	});

	sg.API(request, function (error, response) {
	  if (error) {
	    console.log('Error response received');
	  }
	  console.log('email sent');
	  //console.log(response.statusCode);
	  //console.log(response.body);
	  //console.log(response.headers);
	});

}