const request = require('request');

const geocode=(address,callback)=>{
	const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicHJhdmVlbjkxIiwiYSI6ImNraDM4dHVqcjBpMm8ycm9paXM3dWpkenMifQ.fzLG7qpot0MveN6lj7Fimg&limit=1";
	request({url:url, json:true},(error,{body}={})=>{
		if(error){
			callback("Unable to connect to location services!");
		} else if(body.features.length==0){
			callback("Unable to find location. Try another search");
		} else{
			const features = body.features[0];
			coordinates = features.geometry.coordinates;
			callback(undefined,{
				longitude:coordinates[0],
				latitude:coordinates[1],
				location:features.place_name
			});
		}
	});	
};

module.exports = geocode;