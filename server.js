
const express = require('express');
const createSeaBattle = require('./createSeaBattle');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const port = 3000;

// POST FORM

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get("/form", urlencodedParser, function (request, response) {
   response.sendFile(__dirname + "/formBattle.html");
});
app.post("/form", urlencodedParser, function (request, response) {
   if(!request.body) return response.sendStatus(400);
   console.log(request.body);
   response.send(`${request.body.y} - ${request.body.x}`);
   let y = Number.parseInt(request.body.y);
   let x = Number.parseInt(request.body.x);
   response.send(shot(y,x));
});

// AJAX

const jsonParser = express.json();

app.post("/ajax", jsonParser, function (request, response) {
   // console.log(request.body);
   if(!request.body) return response.sendStatus(400);
    
   //response.json(request.body); // отправляем пришедший ответ обратно
   let y = Number.parseInt(request.body.y);
   let x = Number.parseInt(request.body.x);
   console.log()
   
   fs.appendFile("/ajaxBattle.html", shot(y,x))
   response.send(shot(y,x));
});
 
app.get("/ajax", function(request, response){
     
   response.sendFile(__dirname + "/ajaxBattle.html");
});

app.get('/', function (request, response) {
   //response.send('Hello World!')
    let y = Number.parseInt(request.query.y);
    let x = Number.parseInt(request.query.x);
    response.send(shot(y,x));
  })

async function shot (y, x) {
   const shot = await createSeaBattle();
   const res = shot(y)(x)
   if (res === 1){
      console.log('kill');
      return 'kill';
   }else if (res === 0){
      console.log('hit');
      return 'hit';
   }else if (res === -1){
      console.log('miss');
      return 'miss';
   };
}
// shot(5,6)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
