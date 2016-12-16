var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

function verifyEmailAndPassword(email, password){
 if(password === "123"){
   return Promise.resolve(true);
 }
 else {
   return Promise.resolve(false);
 }
}

/* GET home page. */
router.post('/', function(req, res, next) {
 const { email, password } = req.body;
 // Authenticating with our database
 verifyEmailAndPassword(email, password)
 .then(authentic => {
    if(authentic){
       const payLoad = {
       signedIn: true,
       email: email
   }
   const token = jwt.sign(payLoad, process.env.TOKEN_SECRET,{ algorithm: 'HS256'});
   res.json({
     token: token
   });
}
else {
 res.status(401).json({
   error: 'Invalid username/password'
 });
 }
});

});

module.exports = router;
