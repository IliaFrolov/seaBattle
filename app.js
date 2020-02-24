
const mongoose = require("mongoose");
const express = require("express");
const createSeaBattle = require('./createSeaBattle');

const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

 
const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);
const statisticSchema = new mongoose.Schema({
   name: String,
   hit: Array,
   checked: Array,
   killed: Number,
   shipAmound: Number
});

const Statistics = mongoose.model('Statistics', statisticSchema);


app.use(express.static(__dirname + "/public"));
 
mongoose.connect("mongodb://localhost:27017/seaBattle", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
  
app.get("/api/users", function(req, res){
        
   Statistics.find({}, function(err, users){
 
        if(err) return console.log(err);
        exports.statistic = users;
        statistic = users;
        res.send(users)
    });
});
// app.get("/api/users", function(req, res){
        
//    User.find({}, function(err, users){

//        if(err) return console.log(err);
//        res.send(users)
//    });
// });
app.get("/api/users/:id", function(req, res){
         
    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){
          
        if(err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users", jsonParser, function (req, res) {
        
   if(!req.body) return res.sendStatus(400);
       
   const y = req.body.name;
   const x = req.body.age;
   const shot = createSeaBattle()
   
   createSeaBattle.statistic.save(function(err){
              if(err) return console.log(err);
              res.send(user);
          });
   createSeaBattle.statistic
   res.send(shot(y)(x))

});


// app.post("/api/users", jsonParser, function (req, res) {
        
//     if(!req.body) return res.sendStatus(400);
        
//     const userName = req.body.name;
//     const userAge = req.body.age;
//     const user = new User({name: userName, age: userAge});
        
//     user.save(function(err){
//         if(err) return console.log(err);
//         res.send(user);
//     });
// });
     
app.delete("/api/users/:id", function(req, res){
         
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
                
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.put("/api/users", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = {age: userAge, name: userName};
     
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err); 
        res.send(user);
    });
});
