checkinParser (data){
  if (data.passengers['0'].gender == "MALE"){
    checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mr ${surname}`);}
    else checkin['0'].messages['0'].attachment.payload.intro_message= (`Checkin is available Mrs ${surname}`);
  
  checkin['0'].messages['0'].attachment.payload.pnr_number= (`${codigo}`);
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_number=
  ` ${data.outwardSegments['0'].operatingFlightNumber.company.code}${data.outwardSegments['0'].operatingFlightNumber.number}`;
  
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.airport_code= 
    data.outwardSegments['0'].departure.airport.code;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.city= 
    data.outwardSegments['0'].departure.airport.description;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.terminal=
    data.outwardSegments['0'].departure.terminal;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].departure_airport.gate=
    data.outwardSegments['0'].boarding.gate;
  
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.airport_code= 
    data.outwardSegments['0'].arrival.airport.code;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.city= 
    data.outwardSegments['0'].arrival.airport.description;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.terminal=
    data.outwardSegments['0'].arrival.terminal;
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].arrival_airport.gate= null;
  
horaSalidaFullData = moment(data.outwardSegments['0'].departure.date, "YYYY-MM-DD HH:mm");
// horaSalidaISO = moment(horaSalidaFullData).format("YYYY-MM-DDTHH:mm");
// horaBoarding =moment(horaBoardingFullData).format("HH:mm");

horaBoardingFullData = moment(data.outwardSegments['0'].boarding.date, "YYYY-MM-DD HH:mm");
horaLlegadaFullData = moment(data.outwardSegments['0'].arrival.date, "YYYY-MM-DD HH:mm");


  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.boarding_time = moment(horaBoardingFullData).format("YYYY-MM-DDTHH:mm");
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.departure_time = moment(horaSalidaFullData).format("YYYY-MM-DDTHH:mm");
  checkin['0'].messages['0'].attachment.payload.flight_info['0'].flight_schedule.arrival_time = moment(horaLlegadaFullData).format("YYYY-MM-DDTHH:mm");
}