
const db = require('../db');

async function createSeaBattle () {
   const battleFields = await db.getBattleField();
   const statistic = await db.getStatistic();

   /* let battleFields = [
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 1, 0, 1, 1]
   ];
   */
   // console.log(battleFields);

   // const shipAmound = statistic.shipAmound;
   // const hitArr = statistic.hit;
   // const checked = statistic.checked;
   // let killed = statistic.killed;

   async function hit (y, x) {
      statistic.hit.push(`${y},${x}`);
   }
   async function check (y, x) {
      statistic.checked.push(`${y},${x}`);
   }
   async function kill () {
      statistic.killed += 1;
   }

   function endGame () {
      return (statistic.killed >= statistic.shipAmound);
   }

   return (y) => {
      return (x) => {
         let result;
         console.log('TARGET: ' + [y, x]);
         if (endGame()) {
            throw new Error('Game over, no ships was left');
         }
         if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('You have enter wrong value, enter number');
         }
         if (y > battleFields.length - 1 || x > battleFields[0].length - 1 || y < 0 || x < 0) {
            throw new Error(`You have enter wrong number, enter 0-${battleFields[0].length - 1}`);
         }
         if (statistic.checked.includes(`${y},${x}`)) {
            throw new Error('You have already shooted in this cell');
         }

         check(y, x);

         if (battleFields[y][x] === 0) {
            result = -1;
         } else if (battleFields[y][x] === 1) {
            hit(y, x);
            const start = (n) => (n === 0) ? n : n - 1;
            const end = (n) => (n === battleFields.length - 1) ? n : n + 1;

            for (let a = start(y); a <= end(y); a++) {
               for (let b = start(x); b <= end(x); b++) {
                  
                  if (a === y && b === x) {
                     continue;
                  }
                  
                  if (battleFields[a][b] === 0){
                     result = 1;
                     continue;
                  }
                  console.log('AROUND: ' + JSON.stringify([a,b]));
                  if (statistic.hit.includes(`${a},${b}`)) {

                     result = 1;
                     continue;
                  }else{
                     result = 0;
                     console.log(`intact: ${a},${b}`)
                     //break;
                  }
               }
            }
            if (result === 1) {
               kill();
            }
         }
         console.log('CHECKED: ' + JSON.stringify(statistic.checked));
         console.log('HIT: ' + JSON.stringify(statistic.hit));
         console.log('KILLED: ' + JSON.stringify(statistic.killed));
         //console.log(result);
         db.updateStatistic(statistic);
         return result;
      };
   };
}
// "Mимо": -1
// "Ранил": 0,
// "Убил": 1

module.exports = createSeaBattle;
