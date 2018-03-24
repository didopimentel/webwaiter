var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./schemas/UserSchema');
var Establishment = require('./schemas/EstablishmentSchema');
var bcrypt = require('bcrypt')
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://webwaiteradm:rodrigo123tp@ds033015.mlab.com:33015/webwaiterdb')
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//adding the /users route to our /api router
router.route('/users')
 //retrieve all comments from the database
 .get(function(req, res) {
 //looks at our Comment Schema
 User.find(function(err, users) {
 if (err)
 res.send(err);
 //responds with a json object of our database comments.
 res.json(users)
 });
 })
 //post new user to the database
 .post(function(req, res) {
 var user = new user();
 //body parser lets us use the req.body
 user.email = req.body.email;
 user.username = req.body.username;
 user.password = bcrypt.hashSync(req.body.password, 8);
 user.level = req.body.level;
 user.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: 'User successfully added!' });
 });
 });
// authentication route



//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
