var express = require ('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
app.use(router);
var checkin = require("./templates/checkin.js");
var BoardingPass = require("./templates/boarding_pass.js");

router.get ('/', function(req, res){
  global.surname = req.param ('surname');
  global.codigo = req.param ('codigo');
  checkin[0].messages[0].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
  checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
  res.setHeader('Content-type', 'application/json');
  res.json((checkin[0]));
});


router.get ('/bpass', function(req, res){
  global.surname = req.param ('surname');
  global.codigo = req.param ('codigo');
  BoardingPass[0].messages[0].attachment.payload.boarding_pass[0].passenger_name= (`Mr ${surname}`);
  BoardingPass[0].messages[0].attachment.payload.boarding_pass[0].pnr_number= (`${codigo}`);
  res.setHeader('Content-type', 'application/json');
  res.json((BoardingPass[0]));
});

app.listen (port);
console.log (`Server started at ${port}`)