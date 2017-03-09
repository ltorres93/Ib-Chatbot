var BoardingPassTemplate = [];
BoardingPassTemplate[0]= (
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
            "seat": "74A",
            "auxiliary_fields": [
              {
                "label": "Terminal",
                "value": "T1"
              },
              {
                "label": "Departure",
                "value": "12APR 18:40"
              }
            ],
            "secondary_fields": [
              {
                "label": "Boarding",
                "value": "17:55"
              },
              {
                "label": "Gate",
                "value": "D57"
              },
              {
                "label": "Seat",
                "value": "24A"
              },
              {
                "label": "Sec.Nr.",
                "value": "003"
              }
            ],
            "logo_image_url": "http://hoyiberia.com/img_com/img-iberia.jpg",
            "header_image_url": "https:\/\/www.example.com\/en\/fb\/header.png",
            "qr_code": "M1SMITH\/NICOLAS  CG4X7U nawouehgawgnapwi3jfa0wfh",
            "above_bar_code_image_url": "https:\/\/www.example.com\/en\/PLAT.png",
            "flight_info": {
              "flight_number": "IB3912",
              "departure_airport": {
                "airport_code": "MAD",
                "city": "Madrid",
                "terminal": "T1",
                "gate": "D57"
              },
              "arrival_airport": {
                "airport_code": "PMI",
                "city": "Palma de Mallorca"
              },
              "flight_schedule": {
                "departure_time": "2017-04-12T18:40",
                "arrival_time": "2017-04-12T20:00"
              }
            }
          }]
      }
    }
  }]
})
exports.BoardingPassTemplate= BoardingPassTemplate;