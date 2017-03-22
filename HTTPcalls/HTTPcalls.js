exports.Authorization = function (callback){
  var optionsAuth = {
  uri: "https://pre-ibisauth.iberia.com/api/auth/realms/commercial_platform/protocol/openid-connect/token",
  method: "POST",
  timeout: 10000,
  json:true,
  headers:{ "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization": "Basic aWJlcmlhX3dlYjphOWQ4NjRiZi1jY2Y2LTQwODctYTJmMS1hMzI1YWEyNGIxMWE="}}; 

request (optionsAuth, function(error, response, body) {
    console.log(`El token es ${body.acess_token}`);
    return callback (body.acess_token);
    
  });
};

exports.RequestData = function (surname, code, token, callback){
  var optionsReq = {
  uri: `https://pre-ibisservices.iberia.com/api/pac-prm/rs/checkin/v1/booking/${code}`,
  method: "GET",
  timeout: 10000,
  json:true,
  headers:{ "Content-Type" : "application/json",
            "Accept-Language" : "ES-es",
            "Request-Surname" :`${surname}`,
            "Authorization": `Bearer ${token}`
  }}; 

request (optionsReq, function(error, response, body) {
    if (error) console.log(error);
    data = body;
    console.log(`Los datos del usuario están almacenados}` );
    return callback (data);
});
};
