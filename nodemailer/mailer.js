var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var options = {
            from:'arsalan.zahoor@esajeesolutions.com',
            to: 'arsalan.zahoor@esajeesolutions.com',
            subject: 'Hello Nodemailer From !',
            text:'Testing Nodemailer From Actionhero...!'
        };
transporter.sendMail(options,function(err, res){
    console.log(err,'res:',res);
});Actionhero