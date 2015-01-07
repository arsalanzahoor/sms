// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mysql   = require('mysql');
var total_records=null;
var total_attenedence=null;
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 8080;        // set our port


//==============================================================================
// DATABASE CONNECTION
//==============================================================================
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '786ab786'
});
connection.query('USE dpemployeedb');



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.use(function(req, res, next) {
    // do logging
    console.log('processing request.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
//    res.json({ message: 'hooray! welcome to our api!' });
    res.sendFile(__dirname + '/public/pages/employees-page.html');

});



//router.post('/signin',  function(req, res){
//    //    console.log("Test");
//    //    console.log(req.body);
//    var username = req.body.username;
//    var password = req.body.password;
//    //                console.log("Authorised");
//    if(username==='admin' && password==='admin')
//        {
//            res.send(true);
//        }
//        res.send(false);
//});

// more routes for our API will happen here



// on routes that end in /employee
// =============================================================================
// =============================================================================
router.route('/employee')

    // create a sms (accessed at POST http://localhost:8080/api/employee)
    .post(function(req, res) {
var post1={FirstName:req.body.FirstName,LastName:req.body.LastName,CompanyName:req.body.CompanyName, RegistrationDate:new Date(),FMD:null,
MainID:req.body.MainID};
//-----------------------
console.log(post1.MainID);
if(post1.FirstName!='' && post1.LastName!='' && post1.CompanyName!='' && post1.MainID!==''){
connection.query('INSERT INTO employee set ?', post1, function(err, result) {
if(err){res.json({ message: err });}
else{

res.json({ message: 'New employee saved !',status:'true' });}
})}
else{res.json({message:'Please Enter Missing Field First',status:'false'});}


//-----------------------
})
    // get all the employee from record table (accessed at GET http://localhost:8080/api/employee)
    .get(function(req, res) {
    	connection.query('SELECT COUNT(*) AS total FROM employee',function(err,row){
		total_records=row[0].total;});

        var record_start=req.query.page_start;
        var record_limit=req.query.page_limit;

       if(record_start==='' && record_limit===''){
        connection.query('SELECT * FROM employee LIMIT 10', function(err, rows){
      res.json({message : rows,total_records:total_records,status:'true'});
  		});}
        else{

connection.query("SELECT * FROM employee LIMIT ? OFFSET ?",[parseInt(req.query.page_limit),parseInt(req.query.page_start)], function(err, rows){
      res.json({message : rows,total_records:total_records,status:'true'});
  		});


        }
    });

// =============================================================================
// =============================================================================
// on routes that end in /employee/search
// ----------------------------------------------------

router.route('/employee/:EmployeeID')
    // get the person record  (accessed at GET http://localhost:8080/api/employee/)
    .get(function(req, res) {
//search on the base of FirstName
connection.query("SELECT * FROM employee where EmployeeID =?",[req.params.EmployeeID], function(err, rows){
  if(err){
  
    res.json({ message: err });
      
  }

  else if(rows.length>0){res.json({message : rows,status:'true'});}
  else{res.json({message : 'Person Does not exsist ! ',status:'false'});}
  });


    })
//-----------------------------------


// update  the Person recorrd (accessed at GET http://localhost:8080/api/employee)
   .put(function(req, res) {
     
connection.query("SELECT * FROM employee where EmployeeID =?",[req.params.EmployeeID], function(err, rows){
  if(err){
  
    res.json({ message: err });
      
  }

  else if(rows.length>0){
var post1={FirstName:req.body.FirstName,LastName:req.body.LastName,CompanyName:req.body.CompanyName};
if(post1.FirstName!='' && post1.LastName!='' && post1.CompanyName!=''){
connection.query("update employee set FirstName=?, LastName=?, CompanyName=? where EmployeeID=?",[post1.FirstName,post1.LastName,post1.CompanyName,req.params.EmployeeID], function(err) {
if(err){res.json({ message: err });}
else{
res.json({ message: 'Person  data updated!',status:'true' });}
});}
else{res.json({message:'Please Enter Missing Field First',status:'false'});}

  

  }
  else{res.json({message : 'Person Not Found',status:'false'});}
  });


    });




// on routes that end in /employeeattendence
// =============================================================================
// =============================================================================
router.route('/employeeattendence')

    // create a sms (accessed at POST http://localhost:8080/api/employeeattendence)
    .post(function(req, res) {
var post1={EmployeeID:req.body.EmployeeID, attendence:new Date() };
//-----------------------
if(post1.EmployeeID!=''){
connection.query('INSERT INTO employeeattendence set ?', post1, function(err, result) {
if(err){res.json({ message: err });}
else{

res.json({ message: 'attendence saved !',status:'true' });}
})}
else{res.json({message:'Please Enter EmployeeID First',status:'false'});}



//-----------------------
})
    // get all the employeeattendence from record table (accessed at GET http://localhost:8080/api/eemployeeattendence)
    .get(function(req, res) {
        

        connection.query('SELECT COUNT(*) AS total FROM employeeattendence',function(err,row){
		total_attenedence=row[0].total;});

        var record_start=req.query.page_start;
        var record_limit=req.query.page_limit;

       if(record_start===''&&record_limit===''){
        connection.query('SELECT * FROM employeeattendence LIMIT 10', function(err, rows){
      res.json({message : rows,total_records:total_attenedence,status:'true'});
  		});}
        else{

connection.query("SELECT * FROM employeeattendence LIMIT ? OFFSET ?",[parseInt(req.query.page_limit),parseInt(req.query.page_start)], function(err, rows){
      res.json({message : rows,total_records:total_attenedence,status:'true'});
  		});


        }
    });


// =============================================================================
// =============================================================================




// on routes that end in /employeeattendence/search
// ----------------------------------------------------

router.route('/employeeattendence/:EmployeeID')
    // get the person record  (accessed at GET http://localhost:8080/api/employeeattendence/search)
    .get(function(req, res) {
//search on the base of FirstName
connection.query("SELECT * FROM employeeattendence where EmployeeID =?",[req.params.EmployeeID], function(err, rows){
  if(err){
  
    res.json({ message: err });
      
  }

  else if(rows.length>0){res.json('employeeattendence', {record : rows});}
  else{res.json({record : 'Person Does not exsist ! '});}
  });


    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('attendence server started at ' + port);