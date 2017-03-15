var express = require ('express');
var moment = require('moment');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var checkinjs = require("./templates/checkin.js");
var boardingPassjs = require("./templates/boarding_pass.js");
var token, codigo, surname, origen, horaBoarding, horaBoardingISO, horaBoardingFullData, horaSalidaISO, horasalidaFullData,
 horaLlegada, horaLlegadaISO,horaLlegadaFullData;

app.use(express.static('images'));
app.use(express.static('templates'));
app.use(router);

router.get ('/', function(req, res){
  var checkin = checkinjs.checkinTemplate;
  surname = req.param ('surname');
  codigo = req.param ('codigo');

  checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);
  checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.airport_code= "MAD";
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.city= "Madrid";
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.airport_code= "PMI";
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.city= "Palma de Mallorca";
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.boarding_time = "2017-04-12T17:55";
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.departure_time = "2017-04-12T18:40";
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.arrival_time = "2017-04-12T20:00";
  res.setHeader('Content-type', 'application/json');
  res.json(checkin['0']);
});


router.get ('/shuttle', function(req, res){
  var checkin = checkinjs.checkinTemplate;
  surname = req.param ('surname');
  codigo = req.param ('codigo');
  origen= req.param ('origen');
  horaSalida= req.param ('horaSalida');
  
  	    horasalidaFullData = moment(horaSalida, "HH:mm");
        horaSalidaISO = moment(horasalidaFullData).format("YYYY-MM-DDTHH:mm");

        horaBoardingFullData = moment(horasalidaFullData).subtract(45, 'minutes');
        horaBoardingISO = moment(horaBoardingFullData).format("YYYY-MM-DDTHH:mm"); 
        horaBoarding =moment(horaBoardingFullData).format("HH:mm"); 

        horaLlegadaFullData = moment(horasalidaFullData).add(1, 'hour').add(15, 'minutes');
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
  var notAvailable = [];
  notAvailable['0'] = ({
      "messages": [
      {"text": "This origin is not available!"}      
      ]})

  res.setHeader('Content-type', 'application/json');
  res.json(notAvailable['0']);
  }
});


router.get ('/bpass', function(req, res){
  var boardingPass = boardingPassjs.BoardingPassTemplate;
  surname = req.param ('surname');
  codigo = req.param ('codigo');
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].passenger_name= (`Mr ${surname}`);
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].pnr_number= (`${codigo}`);
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].auxiliary_fields['1'].value= "12APR 18:40";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].secondary_fields['0'].value= "17:55";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_number= "IB3912";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.airport_code = "MAD";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.city = "Madrid";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.airport_code = "PMI";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.city= "Palma de Mallorca";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.departure_time = "2017-04-12T18:40";
  boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.arrival_time= "2017-04-12T20:00";
  res.setHeader('Content-type', 'application/json');
  res.json(boardingPass['0']);
});



router.get ('/bpass/shuttle', function(req, res){
  var boardingPass = boardingPassjs.BoardingPassTemplate;
  surname = req.param ('surname');
  codigo = req.param ('codigo');
  origen= req.param ('origen');
  horaSalida= req.param ('horaSalida');

  if (origen==="Madrid"){
       
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].passenger_name= (`Mr ${surname}`);
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].pnr_number= (`${codigo}`);
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].auxiliary_fields['1'].value= `${moment(horasalidaFullData).format("DDMMM HH:mm")}`;
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].secondary_fields['0'].value= horaBoarding;
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_number= "IB1793";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.airport_code = "MAD";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.city = "Madrid";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.airport_code = "BCN";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.city= "Barcelona";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.departure_time = horaSalidaISO;
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.arrival_time= horaLlegadaISO;
    
    res.setHeader('Content-type', 'application/json');
    res.json(boardingPass['0']);
  } else if (origen == "Barcelona") {
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].passenger_name= (`Mr ${surname}`);
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].pnr_number= (`${codigo}`);
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].auxiliary_fields['1'].value= `${moment(horasalidaFullData).format("DDMMM HH:mm")}`;
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].secondary_fields['0'].value= horaBoarding;
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_number= "IB1721";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.airport_code = "BCN";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.city = "Barcelona";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.airport_code = "MAD";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.city= "Madrid";
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.departure_time = horaSalidaISO;
    boardingPass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.arrival_time= horaLlegadaISO;
    res.setHeader('Content-type', 'application/json');
    res.json(boardingPass['0']);
  } else {
  var notAvailable = [];
  notAvailable['0'] = ({
      "messages": [
      {"text": "This origin is not available!"}      
      ]})
  res.setHeader('Content-type', 'application/json');
  res.json(notAvailable['0']);
  }
});


app.listen (port);
console.log (`Server started at ${port}`)
