const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/seaBattle', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   console.log('connected!');
});
const battleFieldsSchema = new mongoose.Schema({
   name: String,
   field: Array
});

const BattleField = mongoose.model('BattleField', battleFieldsSchema);

/* let level2 = new BattleField({name:'level1', field: battleFields})

level2.save(function (err, level) {
   if (err) return console.error(err);
   console.log(level)
 }); */

const statisticSchema = new mongoose.Schema({
   name: String,
   hit: Array,
   checked: Array,
   killed: Number,
   shipAmound: Number
});

const Statistics = mongoose.model('Statistics', statisticSchema);


const statistic = new Statistics({ name: 'statistic', killed: 0, shipAmound: 10 });

// statistic.save(function (err, statistic) {
//    if (err) return console.error(err);
//    console.log(statistic);
//  });

async function getBattleField (level = 'level1') {
   const battleField = await BattleField.findOne({ name: level });
   console.log('got BF');
   return battleField.field;
}

async function getStatistic () {
   const statistic = await Statistics.findOne({ name: 'statistic' });
   console.log('got stat');
   return statistic;
}
let stat  = getStatistic ();
async function updateStatistic (obj) {
   const resp = await Statistics.updateOne(obj);
   console.log('updated stat');
   // console.log(resp.nModified);
}

async function newGame () {
   await Statistics.deleteMany({ name: 'statistic' }, function (err) {
      if (err) return console.error(err);
    });

    await statistic.save(function (err, statistic) {
      if (err) return console.error(err);
      console.log(statistic);
    });
    
}
newGame ()
// getStatistic();
// getBattleField('level1');

exports.getBattleField = getBattleField;
exports.getStatistic = getStatistic;
exports.updateStatistic = updateStatistic;
exports.stat = stat;
