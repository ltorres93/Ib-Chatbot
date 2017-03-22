
var moment = require('moment');
exports.boardingParser = function (clientData, bpass, surname, codigo) {


horaSalidaFullclientData = moment(clientData.outwardSegments['0'].departure.date, "YYYY-MM-DD HH:mm");
// horaSalidaISO = moment(horaSalidaFullclientData).format("YYYY-MM-DDTHH:mm");
// horaBoarding =moment(horaBoardingFullclientData).format("HH:mm");
horaBoardingFullclientData = moment(clientData.outwardSegments['0'].boarding.date, "YYYY-MM-DD HH:mm");
horaLlegadaFullclientData = moment(clientData.outwardSegments['0'].arrival.date, "YYYY-MM-DD HH:mm");

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].passenger_name = 
`${clientData.passengers['0'].name} ${clientData.passengers['0'].surname}`;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].pnr_number = `${codigo}` ;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].travel_class = 
clientData.outwardSegments['0'].cabinClass.type;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].seat = 
clientData.outwardSegments['0'].passengers['0'].seat;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].auxiliary_fields['0'].value =
clientData.outwardSegments['0'].departure.terminal;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].auxiliary_fields['1'].value =
moment(horaSalidaFullclientData).format("DDMMM HH:mm");

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].secondary_fields['0'].value =
moment(horaBoardingFullclientData).format("HH:mm");

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].secondary_fields['1'].value = 
clientData.outwardSegments['0'].passengers['0'].seat;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_number = 
`${clientData.outwardSegments['0'].operatingFlightNumber.company.code}${clientData.outwardSegments['0'].operatingFlightNumber.number}`;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.airport_code = 
  clientData.outwardSegments['0'].departure.airport.code;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.city = 
  clientData.outwardSegments['0'].departure.airport.description;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.terminal = 
  clientData.outwardSegments['0'].departure.terminal;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.departure_airport.gate = 
  clientData.outwardSegments['0'].boarding.gate;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.airport_code = 
  clientData.outwardSegments['0'].arrival.airport.code;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.arrival_airport.city = 
  clientData.outwardSegments['0'].arrival.airport.description;

bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.departure_time = 
    moment(horaSalidaFullclientData).format("YYYY-MM-DDTHH:mm");
bpass['0'].messages['0'].attachment.payload.boarding_pass['0'].flight_info.flight_schedule.arrival_time = 
    moment(horaLlegadaFullclientData).format("YYYY-MM-DDTHH:mm");

return bpass;
};

