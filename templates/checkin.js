var checkinTemplate = [];
checkinTemplate[0]= ({
  "messages": [
  {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "airline_checkin",
        "intro_message": "Welcome Mr $surname",
        "locale": "en_US",
        "theme_color":"#d61a2b",
        "pnr_number": "Code",
        "flight_info": [
          {
            "flight_number": "IB3912",
            "departure_airport": {
              "airport_code": "MAD",
              "city": "Madrid",
              "terminal": "T4",
              "gate": "D57"
            },
            "arrival_airport": {
              "airport_code": "PMI",
              "city": "Palma de Mallorca",
              "terminal": "T1",
              "gate": "G2"
            },
            "flight_schedule": {
              "boarding_time": "2017-04-12T17:55",
              "departure_time": "2017-04-12T18:40",
              "arrival_time": "2017-04-12T20:00"
            }
          }
        ],
        "checkin_url": "http://www.iberia.com/es/autocheckin-online/"
      }
    }
  }]
})
exports.checkinTemplate= checkinTemplate;