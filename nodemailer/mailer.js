var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var options = {
            from:'arsalanzahoor786@gmail.com',
            to: 'arsalanzahoor786@gmail.com',
            subject: 'Hello Nodemailer From !',
            text:'Testing Nodemailer From Actionhero...!'
        };
transporter.sendMail(options,function(err, res){
    console.log(err,'res:',res);
});Actionhero