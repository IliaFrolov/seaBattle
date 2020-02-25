
const mongoose = require("mongoose");
const express = require("express");
const createSeaBattle = require('./createSeaBattle');

const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

 
const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);
const statisticSchema = new mongoose.Schema({
   _id: Number,
   name: String,
   hit: Array,
   checked: Array,
   killed: Number,
   shipAmound: Number,
   history: Array
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

   getStat((stat)=>res.send(stat))
 
});
// app.get("/api/users", function(req, res){
        
//    User.find({}, function(err, users){

//        if(err) return console.log(err);
//        res.send(users)
//    });
// });
// app.get("/api/users/:id", function(req, res){
         
//     const id = req.params.id;
//     User.findOne({_id: id}, function(err, user){
          
//         if(err) return console.log(err);
//         res.send(user);
//     });
// });
function getStatistic () {
   Statistics.findOne({}, function(err, res){
      if (err) console.log(err)
      return res;
   });
}
async function updateStatistic (obj) {
   const resp = await Statistics.updateOne(obj);
   console.log('updated stat');
   // console.log(resp.nModified);
}
exports.updateStatistic = updateStatistic;
exports.getStat = getStatistic;
// exports.getStat = getStat;
function start () {
   Statistics.findOne({ _id:1}, function(err, res){
      if(!res){
         statistic.save(function (err, statistic) {
            if (err) return console.error(err);
            console.log(statistic);
         });
      }
   });
}
function getStat(callback){
   Statistics.find({}, function(err, stat){
      if(!err) callback(stat);
      console.log(`got stat`);
   });
}
function updateStat(obj, callback){
   Statistics.updateOne(obj, function(err, stat){
      if(!err) callback(stat);
      console.log(`up stat`);
   });
}

app.post("/api/users", jsonParser, async function (req, res) {
        
   if(!req.body) return res.sendStatus(400);

//    Statistics.find({}, function(err, stat){
//       console.log(stat[0]);
//       if(err) return console.log(err);
//       exports.stat = stat[0];
 
//   });
   const y = Number.parseInt(req.body.y);
   const x = Number.parseInt(req.body.x);
   getStat(async function(stat){
      console.log(`app.stat`);
      console.log(stat);
      exports.stat = stat;
      const shot = await createSeaBattle.createSeaBattle();
      shot(y)(x);
      updateStat(createSeaBattle.statistic, function(stat){
         res.send(stat)
      })
   })
   
   // const shot = await createSeaBattle()
   
   // Statistics.updateOne(createSeaBattle.statistic, function(err, user){
   //            if(err) return console.log(err);
   //          //   res.send(user);
   //        });
   // createSeaBattle.statistic
   // let result = shot(y)(x)
   // res.send(`${result}`)

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
const statistic = new Statistics({_id: 1, name: 'statistic', killed: 0, shipAmound: 10 });
app.delete("/api/users/", function(req, res){

   Statistics.replaceOne({_id: 1}, statistic, {upsert: false}, function (err, statistic) {
      if (err) return console.error(err);
      console.log(statistic);
      res.send(statistic);
   });

});
// app.delete("/api/users/:id", function(req, res){
         
//     const id = req.params.id;
//     User.findByIdAndDelete(id, function(err, user){
                
//         if(err) return console.log(err);
//         res.send(user);
//     });
// });
    
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
start();
