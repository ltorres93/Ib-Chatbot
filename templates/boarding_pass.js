var BoardingPass = [];
BoardingPass[0]= (
{
 "messages": [
  {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "airline_boardingpass",
        "intro_message": "You are checked in.",
        "locale": "en_US",
        "theme_color":"#d61a2b",
        "boarding_pass": 
          [{
            "passenger_name": "LUIS TORRES",
            "pnr_number": "CG4X7U",
            "travel_class": "business",
            "seat": "74J",
            "auxiliary_fields": [
              {
                "label": "Terminal",
                "value": "T1"
              },
              {
                "label": "Departure",
                "value": "30OCT 19:05"
              }
            ],
            "secondary_fields": [
              {
                "label": "Boarding",
                "value": "18:30"
              },
              {
                "label": "Gate",
                "value": "D57"
              },
              {
                "label": "Seat",
                "value": "74J"
              },
              {
                "label": "Sec.Nr.",
                "value": "003"
              }
            ],
            "logo_image_url": "http://www.outono.net/elentir/wp-content/uploads/2013/10/10334967323_f1b359c78a_o.png",
            "header_image_url": "https:\/\/www.example.com\/en\/fb\/header.png",
            "qr_code": "M1SMITH\/NICOLAS  CG4X7U nawouehgawgnapwi3jfa0wfh",
            "above_bar_code_image_url": "https:\/\/www.example.com\/en\/PLAT.png",
            "flight_info": {
              "flight_number": "KL0642",
              "departure_airport": {
                "airport_code": "MAD",
                "city": "Madrid",
                "terminal": "T1",
                "gate": "D57"
              },
              "arrival_airport": {
                "airport_code": "SEA",
                "city": "Seattle"
              },
              "flight_schedule": {
                "departure_time": "2016-01-02T19:05",
                "arrival_time": "2016-01-05T17:30"
              }
            }
          }]
      }
    }
  }]
})
module.exports= BoardingPass;