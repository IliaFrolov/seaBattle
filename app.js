
const mongoose = require("mongoose");
const express = require("express");
const createSeaBattle = require('./createSeaBattle');

const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

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
const statistic = new Statistics({_id: 1, name: 'statistic', killed: 0, shipAmound: 10 });

app.use(express.static(__dirname + "/public"));
 
mongoose.connect("mongodb://localhost:27017/seaBattle", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
  
app.get("/api",async function(req, res){
   let stat = await getStat()
   res.send(stat);
});

app.put("/api", jsonParser, async function (req, res) {
        
   if(!req.body) return res.sendStatus(400);

   const y = Number.parseInt(req.body.y);
   const x = Number.parseInt(req.body.x);
   
   const shot = await createSeaBattle.createSeaBattle();
   shot(y)(x);

   stat = await getStat()
   res.send(stat)   
});

function start () {
   Statistics.findOne({ _id:1}, function(err, res){
      if(!res){
         statistic.save(function (err, statistic) {
            if (err) return console.error(err);
         });
      }
   });
}

function getStat(){
   return Statistics.findOne({}, function(err, stat){
         if(!err) return stat;
         console.log(`got stat`);
      });
}
function updateStat(obj){
  Statistics.updateOne(obj, function(err, stat){
      if(!err) return stat;
      console.log(`up stat`);
   });
}



app.delete("/api", function(req, res){

   Statistics.replaceOne({_id: 1}, statistic, {upsert: false}, function (err, statistic) {
      if (err) return console.error(err);
      res.send(statistic);
   });

});

// app.put("/api/users", jsonParser, function(req, res){
         
//     if(!req.body) return res.sendStatus(400);
//     const id = req.body.id;
//     const userName = req.body.name;
//     const userAge = req.body.age;
//     const newUser = {age: userAge, name: userName};
     
//     User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
//         if(err) return console.log(err); 
//         res.send(user);
//     });
// });

start();

exports.updateStat = updateStat;
exports.getStat = getStat;
