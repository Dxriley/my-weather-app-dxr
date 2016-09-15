import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {
  weatherData : any;
  
  constructor(private http: Http) {}

  getWeather(city:string) {
  	// * http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=37ecf81509e93c40807891b21e96363c
    // * Examples of API calls:
    // * standard api.openweathermap.org/data/2.5/find?q=London
    // * metric api.openweathermap.org/data/2.5/find?q=London&units=metric
    // * imperial api.openweathermap.org/data/2.5/find?q=London&units=imperial
  	var appId = '37ecf81509e93c40807891b21e96363c';
  	var baseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
  	//var city = "Denver,us";
  	var modeURLComponent = "&mode=json";
  	var units = "imperial";  //units options metric or imperial
   	var getRequestURL = baseURL + city + modeURLComponent + "&appid=" + appId + "&units="+units;

   	var forecast : any;

  	// var headers = new Headers();
  	// headers.append('X-Parse-Application-Id', '2gBclkQMbECCFK8l5QQarvVSJC0WWkVFdEovOUf0');
  	// headers.append('X-Parse-REST-API-Key','0i2XpIOtg8gUkV0UDUxbcbOGT4STHJr68Hzcw3MI');
  	// var options = new RequestOptions({headers: headers});

  	return new Promise(resolve => {
	  	//this.http.get('https://api.parse.com/1/classes/Adhesi');
	  	this.http.get(getRequestURL)
	  		.map(res => res.json())
	  		.subscribe(
          data => {
  	  			this.weatherData = data;
  	  			console.log("Weather data -->"+ JSON.stringify(data));
  	  			resolve(this.weatherData);
	  		  },
	  		  err => console.log(err),
	  		  () => console.log()
         );
  	}); //new promise
  }

  // getCurrentWeather(city:string) {

  // }
}

