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
  	var modeURLComponent = "&mode=json";
    //TODO: pass units as parameter --Riley
  	var units = "imperial";  //units options metric or imperial
   	var getRequestURL = baseURL + city + modeURLComponent + "&appid=" + appId + "&units="+units;
   	var forecast : any;

  	return new Promise(resolve => {
	  	this.http.get(getRequestURL)
	  		.map(res => res.json())
	  		.subscribe(
          data => {
  	  			this.weatherData = data;
  	  			//console.log("Weather data -->"+ JSON.stringify(data));
  	  			resolve(this.weatherData);
	  		  },
	  		  err => console.log(err),
	  		  () => console.log("getWeater completed")
         );
  	}); //new promise
  }

  //TODO: get current weather --Riley
  // getCurrentWeather(city:string) {

  // }
}

