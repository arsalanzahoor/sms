var mysql=require('mysql');
//module.exports=connection;
var connection;
connection = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password:'786ab786',
    database: 'sms'
});
connection.connect(function (err)
{
    if(err)
    {
        console.log("Error In Connection!!!");
        return;
    }
    console.log('Connected as id:'+connection.threadId);
});

module.exports = connection;