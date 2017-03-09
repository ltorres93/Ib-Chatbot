var express = require ('express');
var moment = require('moment');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
app.use(router);
var checkin = require("./templates/checkin.js");
var BoardingPass = require("./templates/boarding_pass.js");
var token, codigo, surname, origen, horaBoarding, horaBoardingISO, horaSalidaISO, horaLlegada,
    horaLlegadaISO;


router.get ('/', function(req, res){
  surname = req.param ('surname');
  codigo = req.param ('codigo');

  checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
  checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
  res.setHeader('Content-type', 'application/json');
  res.json(checkin['0']);
});


router.get ('/shuttle', function(req, res){
  surname = req.param ('surname');
  codigo = req.param ('codigo');
  origen= req.param ('origen');
  horaSalida= req.param ('horaSalida');
  
  	var horasalidaFullData = moment(horaSalida, "HH:mm");
        horaSalidaISO = moment(horasalidaFullData).format("YYYY-MM-DDTHH:mm");

    var horaBoardingFullData = moment(horasalidaFullData).subtract(45, 'minutes');
        horaBoardingISO = moment(horaBoardingFullData).format("YYYY-MM-DDTHH:mm"); 
        horaBoarding =moment(horaBoardingFullData).format("HH:mm"); 

    var horaLlegadaFullData = moment(horasalidaFullData).add(1, 'hour').add(15, 'minutes');
        horaLlegadaISO = moment(horaLlegadaFullData).format("YYYY-MM-DDTHH:mm"); 
        horaLlegada =moment(horaLlegadaFullData).format("HH:mm");

  if (origen==="Madrid"){
       
    checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
    checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_number = "IB1793";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.airport_code= "MAD";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.city= "Madrid";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.airport_code= "BCN";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.city= "Barcelona";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.boarding_time = horaBoardingISO;
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.departure_time = horaSalidaISO;
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.arrival_time = horaLlegadaISO;
    res.setHeader('Content-type', 'application/json');
    res.json((checkin['0']));
  } else if (origen == "Barcelona") {
    checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
    checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_number = "IB1721";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.airport_code= "BCN";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.city= "Barcelona";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.airport_code= "MAD";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.city= "Madrid";
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.boarding_time = horaBoardingISO;
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.departure_time = horaSalidaISO;
    checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.arrival_time = horaLlegadaISO;
    res.setHeader('Content-type', 'application/json');
    res.json((checkin['0']));
  } else {

  checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
  checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
  res.setHeader('Content-type', 'application/json');
  res.json({
      "messages": [
      {"text": "Welcome to our store!"},
      {"text": "How can I help you?"}
      ]});
  }
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