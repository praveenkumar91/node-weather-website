console.log('Client side javascript is loaded')

const form = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#p1');
const msg2 = document.querySelector('#p2');

form.addEventListener('submit',(e)=>{
	e.preventDefault();
	const location = search.value;
	msg1.innerText="loading......";
	msg2.innerText=null;
	fetch('/weather?address='+location+'').then((response)=>{
		response.json().then((data)=>{
			if(data.error){
				msg2.innerText = data.error;
				msg1.innerText=null;
			}else{
				const current=data.data.current;
				const str="Today: "+current.weather_descriptions[0]+". The temprature is "+current.temperature+"°C but its feels like "+current.feelslike+"°C";
				msg1.innerText=str;
				msg2.innerText=null;
				
				
			}
			
		});
	});
});