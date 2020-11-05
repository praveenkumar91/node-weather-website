const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDir= path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index',{
	  title:'Weather',
	  name:'Praveen Kumar'
  });
});

app.get('/help', (req, res) => {
	res.render('help',{
		  title:'Help',
	      helptext:'This is the help text',
	      name:'Praveen Kumar'
	  });
});

app.get('/about',(req,res)=>{
	res.render('about',{
		  title:'About',
		  name:'Praveen Kumar'
	  });
});

app.get('/weather',(req,res)=>{
	
	if(!req.query.address){
		return res.send({
			error:'You must provide a address'
		})
	}
	const address=req.query.address;
	
	geocode(address,(error,{latitude, longitude, location}={})=>{
		if(error){
			return res.send({
				error:error
			})
		}
		forecast(latitude,longitude,'m',(error,forecastData={})=>{
			if(error){
				return console.log(error);
			}
			
			res.send({
				forecastData:forecastData,
				location:location
			});
		});
	});
});


app.get('/products',(req,res)=>{
	if(!req.query.search){
		return res.send({
			error:'You must provide a search term'
		})
	}
	
	console.log(req.query.search)
	res.send({
		products:[]
	});
})


//this is for error page

app.get('/help/*',(req,res)=>{
	res.render('error',{
		  title:'Error',
		  name:'Praveen Kumar',
	      text:'Help Atricle not found.'
	  });
})


app.get('*',(req,res)=>{
	res.render('error',{
		  title:'Error',
		  name:'Praveen Kumar',
	      text:'Page not found.'
	  });
})

 
app.listen(port,()=>{
	console.log('Server is up on port '+port+'');
})