const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userSchema = require("../models/userSchema");
let user = mongoose.model('user', userSchema);

//get user
router.get('/users',(req,res)=>{
  
   user.find({}, function (err, users) {
        res.send(users);
    });
})


// save users
router.post('/users', (req, res) => {
   
  // Create an instance of model SomeModel
   var user_instance = new user(req.body);

    // Save the new model instance, passing a callback
    user_instance.save(function (err) {
      if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              // Duplicate username
              return res.status(500).send({ succes: false, message: 'User already exist!' });
            }

            // Some other error
            return res.status(500).send(err);
      }

        res.json({
          success: true
        });
      // saved!
    });

});


// update user if exists
router.post('/users/update', (req, res) => {
   var query = { username: req.body.username };
   user.findOneAndUpdate(query, { $set: req.body}, function(err, doc){
    if(err){
            // Some error
            return res.status(500).send(err);
    }
     res.json({
          success: true
     });
     //updated!
   });
 
});

// delete user
router.post('/users/delete', (req, res) => {
   var query = { username: req.body.username };
   user.find(query).remove(function(err, doc){
    if(err){
            // Some error
            return res.status(500).send(err);
    }
     res.json({
          success: true
     });
     //deleted!
   });
 
});

module.exports = router;



