var express = require ('express');
var request = require("request");
var moment = require('moment');
var app = express();
var port = process.env.PORT || 7000;
var router = express.Router();
var checkinTemplate = require("./templates/checkin.js");
var bpassTemplate = require("./templates/boarding_pass.js");
var checkinParser = require("./Parser/checkinParser.js").checkinParser;
var boardingParser = require("./Parser/boardingParser.js").boardingParser;
var token, codigo, surname, origen, clientData, horaBoarding, horaBoardingISO, horaBoardingFullData, horaSalidaISO, horasalidaFullData,
 horaLlegada, horaLlegadaISO,horaLlegadaFullData;

app.use(express.static('images'));
app.use(express.static('templates'));
app.use(router);

router.get ('/checkin', function(req, res){
  var surname, code, token, checkin;
  var Authorization = require("./HTTPcalls/HTTPcalls.js").Authorization;
  var RequestData = require("./HTTPcalls/HTTPcalls.js").RequestData;
  checkin = new checkinTemplate ();
  surname = req.param ('surname');
  codigo = req.param ('codigo');

  Authorization(function(acess_token){
      token = acess_token;
      RequestData (surname, codigo, token, function (data) {
      clientData = data;
      checkinUpdated = checkinParser (clientData, checkin, surname, codigo);
      res.send(checkinUpdated);
      });
  });
});

router.get ('/bpass', function(req, res){
  bpass = new bpassTemplate();
  surname = req.param ('surname');
  codigo = req.param ('codigo');
  bpassUpdated = boardingParser(clientData, bpass, surname, codigo);
  res.send(bpassUpdated); 
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
