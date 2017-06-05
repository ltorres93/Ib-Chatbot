
var moment = require('moment');
exports.checkinParser = function (clientData, checkin, surname, codigo) {
  if (clientData.passengers['0'].gender == "MALE"){
    checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);}
    else checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mrs ${surname}`);
  
  checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_number=
  ` ${clientData.outwardSegments['0'].operatingFlightNumber.company.code}${clientData.outwardSegments['0'].operatingFlightNumber.number}`;
  
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.airport_code= 
    clientData.outwardSegments['0'].departure.airport.code;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.city= 
    clientData.outwardSegments['0'].departure.airport.description;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.terminal=
    clientData.outwardSegments['0'].departure.terminal;
  
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.gate=
    clientData.outwardSegments['0'].boarding.gate;
  
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.airport_code= 
    clientData.outwardSegments['0'].arrival.airport.code;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.city= 
    clientData.outwardSegments['0'].arrival.airport.description;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.terminal=
    clientData.outwardSegments['0'].arrival.terminal;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.gate= null;
  
horaSalidaFullclientData = moment(clientData.outwardSegments['0'].departure.date, "YYYY-MM-DD HH:mm");
// horaSalidaISO = moment(horaSalidaFullclientData).format("YYYY-MM-DDTHH:mm");
// horaBoarding =moment(horaBoardingFullclientData).format("HH:mm");

horaBoardingFullclientData = moment(clientData.outwardSegments['0'].boarding.date, "YYYY-MM-DD HH:mm");
horaLlegadaFullclientData = moment(clientData.outwardSegments['0'].arrival.date, "YYYY-MM-DD HH:mm");


  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.boarding_time = moment(horaBoardingFullclientData).format("YYYY-MM-DDTHH:mm");
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.departure_time = moment(horaSalidaFullclientData).format("YYYY-MM-DDTHH:mm");
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.arrival_time = moment(horaLlegadaFullclientData).format("YYYY-MM-DDTHH:mm");

return checkin;
};

