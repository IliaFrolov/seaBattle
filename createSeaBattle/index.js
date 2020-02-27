
// const db = require('../db');
const app = require('../app');
let battleFields = [
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
// const statistic = {
//    "hit": [],
//    "checked": [],
//    "history": [],
//    "name": "statistic",
//    "killed": 0,
//    "shipAmound":10,
// }


// const statistic = await app.getStat();

async function createSeaBattle () {

   let statistic = await app.getStat();

   function hit (y, x) {
      statistic.hit.push(`${y},${x}`);
   }
   function check (y, x) {
      statistic.checked.push(`${y},${x}`);
   }
   function kill () {
      statistic.killed += 1;
   }
   function addResult (result) {
      statistic.history.push(result);
   }
   function endGame () {
      return (statistic.killed >= statistic.shipAmound);
   }
   let result;

   return (y) => {
      return (x) => {
         try{
         console.log('TARGET: ' + [y, x]);
         if (endGame()) {
            throw new Error('Game over, no ships was left');
         }
         // if (!y || !x) {
         //    throw new Error('Error! Please enter coordinats');
         // }
         if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('Error! You have enter wrong coordinats, please enter number');
         }
         if (y > battleFields.length - 1 || x > battleFields[0].length - 1 || y < 0 || x < 0) {
            throw new Error(`Error! You have enter wrong number, enter 0-${battleFields[0].length - 1}`);
         }
         if (statistic.checked.includes(`${y},${x}`)) {
            throw new Error('You have already shooted in this cell');
         }

         check(y, x);
         function onBF(y,x){
            if(y > battleFields.length - 1 || x > battleFields.length - 1 || y < 0 || x < 0){
               return 0;
            }else
            return battleFields[y][x];
         }
         if (battleFields[y][x] === 0) {
            result = -1;
         } else if (battleFields[y][x] === 1) {
            hit(y, x);
            const start = (n) => n - 1;
            const end = (n) => n + 1;
            const min = (n) =>  n - 3;
            const max = (n) =>  n + 3;
            function checkAround(){
               // function checker(y,x){
               //    if (battleFields[y][x] === 1){
               //       if(statistic.hit.includes(`${y},${x}`)) {
               //          result = 1;
               //          continue;
               //       }else{
               //          result = 0;
               //          break;
               //       }
               //    }else {
               //       result = 1;
               //       break;
               //    }
               // }
               if(onBF(y - 1,x) === 1 || onBF(y + 1,x) === 1){
                  console.log(`UP`);
                  for (let v = start(y); ; v--){
                     console.log(`UP: ${v},${x}`);
                     if (battleFields[v][x] === 1){
                        if(statistic.hit.includes(`${v},${x}`)) {
                           console.log('kill 1');
                           result = 1;
                           continue;
                        }else{
                           console.log('hit 1');
                           result = 0;
                           break;
                        }
                     }else {
                        console.log('kill 2');
                        result = 1;
                        break;
                     }
                  }
                  if (result === 1){
                     console.log(`DOWN`);
                     for (let v = end(y); ; v++){
                        console.log(`DOWN: ${v},${x}`);
                        
                        if (battleFields[v][x] === 1){
                           if(statistic.hit.includes(`${v},${x}`)) {
                              console.log('kill 3');
                              result = 1;
                              continue;
                           }else{
                              console.log('hit 2');
                              result = 0;
                              break;
                           }
                        }else {
                           console.log('kill 4');
                           result = 1;
                           break;
                        }
                     }
                  }
               }else if(onBF(y,x - 1) === 1 || onBF(y,x + 1) === 1){
                  console.log(`LEFT`);
                  for (let v = start(x); ; v--){
                     console.log(`LEFT:  ${y},${v}`);
                     console.log(battleFields[y][v])
                     if (battleFields[y][v] === 1){
                        if(statistic.hit.includes(`${y},${v}`)) {
                           console.log('kill 5');
                           result = 1;
                           continue;
                        }else{
                           console.log('hit 3');
                           result = 0;
                           break;
                        }
                     }else {
                        console.log('kill 6');
                        result = 1;
                        break;
                     }
                  }
                  if (result === 1){
                  console.log(`RIGHT`);
                     for (let v = end(x); v <= battleFields.length - 1; v++){
                        console.log(`RIGHT:  ${y},${v}`);
                        if (battleFields[y][v] === 1){
                           if(statistic.hit.includes(`${y},${v}`)) {
                              console.log('kill 7');
                              result = 1;
                              continue;
                           }else{
                              console.log('hit 4');
                              result = 0;
                              break;
                           }
                        }else {
                           console.log('kill 8');
                           result = 1;
                           break;
                        }
                     }
                  }
               }else{
                  console.log('kill 9');
                  result = 1;
               }

            }
            checkAround();
            if (result === 1) {
               kill();
            }
         }
         // console.log('CHECKED: ' + JSON.stringify(statistic.checked));
         // console.log('HIT: ' + JSON.stringify(statistic.hit));
         // console.log('KILLED: ' + JSON.stringify(statistic.killed));
         console.log(result);
         
         addResult(`User shot y:${y}, x:${x}. Result: ${result}`)
         app.updateStat(statistic);
         

         }catch(err){
            addResult(err.message);
            console.log(err.message)
            return err.message;
            
         }finally{
           return statistic;
             
         }

      };
   };
}
// "Mимо": -1
// "Ранил": 0,
// "Убил": 1

exports.createSeaBattle = createSeaBattle;
// exports.statistic = statistic;
