const request=require('request');

const forecast=(latitude,longitude,units,callback)=>{
	const url = "http://api.weatherstack.com/current?access_key=b6b29a1420b00625ac6594a9ff25a6d6&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"&units="+encodeURIComponent(units)+"";
	request({url:url, json:true},(error,{body}={})=>{
		if(error){
			callback("Unable to connect to weather service");
		} else if(body.error){
			callback(body.error);
		} else if(body.message){
			callback(body.message);
		} else{
			const {weather_descriptions, temperature:temp, feelslike} = body.current;
			callback(undefined,{
				desc:weather_descriptions[0],
				temp,
				feelslike
			});
		}
	});
};

module.exports = forecast;