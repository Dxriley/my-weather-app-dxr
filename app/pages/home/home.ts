import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WeatherService } from "../../providers/weather-service/weather-service";

interface City {
	name: string;
	apiCity: string;
}

// interface FullDayForcast {
//         dayOfWeek: string;
//              date: Date;
//           lowTemp: number;
//          highTemp: number;
//       currentTemp: number;
//   currentHumidity: number;
//       weatherMain: string;
//       weatherIcon: string;
//  threeHourForcast: Array[];
// }
//&#8451; degrees celsius
//&#8457; degrees fahrenheit

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  isDoneLoading = false;
  city = { name: "Denver, US",apiCity: "Denver, US" };
  fiveDayEvery3Hours : any;
  dayOfTheWeek = new Array(7);
  basicFiveDayForcast = [];


  constructor(public navCtrl: NavController, public weather: WeatherService) {
  	this.getTheWeatherFor(this.city.apiCity);
    this.dayOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
  }

  getTheWeatherFor(apiCity) {
  	this.isDoneLoading = false;
  	this.weather.getWeather(this.city.apiCity)
  		.then(weatherData => {
        //Assumption data will stay cronologically ordered and ascending
        this.fiveDayEvery3Hours = weatherData["list"];
	  		console.log("fiveDayEvery3Hours-->" + JSON.stringify(this.fiveDayEvery3Hours));
          var aDate = new Date();          
          var currentDate = aDate.getMonth()+1+"/"+aDate.getDate()+"/"+aDate.getFullYear();
          var currentTemp = 0;
          var currentHumidity = 0;
          var i = 0;
          console.log("1");
          this.basicFiveDayForcast = [];
          var oneDayForcast = {
                     dayOfWeek: null,
                          date: null,
                       lowTemp: 1000,
                      highTemp: -1000,
                   currentTemp: 1000,
               currentHumidity: 1000,
                   weatherMain: null,
                   weatherIcon: null,
              threeHourForcast:  []
            };
          // console.log("2");
          // oneDayForcast.lowTemp = 1000;
          // console.log("3");
          // oneDayForcast.highTemp = -1000;
          var tempDay3HourForcastArray = [];
          for (var j = 0; j <= this.fiveDayEvery3Hours.length - 1; j++) {
            aDate = new Date(this.fiveDayEvery3Hours[j].dt*1000);
            var theDay = aDate.getDate();
            var theMonth = aDate.getMonth()+1;
            var theYear = aDate.getFullYear();
            var theDate = theMonth+"/"+theDay+"/"+theYear;
            console.log("*******this.fiveDayEvery3Hours["+j+"].temp->"+ this.fiveDayEvery3Hours[j].main.temp);
//             previousHumitity = this.f

// dasfasasfasfasd

            tempDay3HourForcastArray.push(this.fiveDayEvery3Hours[j]);

            if (oneDayForcast.highTemp < this.fiveDayEvery3Hours[j].main.temp) {
              oneDayForcast.highTemp = this.fiveDayEvery3Hours[j].main.temp;
            }
            if (oneDayForcast.lowTemp > this.fiveDayEvery3Hours[j].main.temp) {
              oneDayForcast.lowTemp = this.fiveDayEvery3Hours[j].main.temp;
            }
            //just take the mainweather as day's word forcast ie(Sunny)
            if (true == true){

            }
            console.log("*******Date->"+ theDate);
            if (theDate != currentDate || j == this.fiveDayEvery3Hours.length - 1) {//|| j == this.fiveDayEvery3Hours.length - 1
              console.log("**------ day"+i+1);
              oneDayForcast.date = currentDate;
              oneDayForcast.dayOfWeek = this.dayOfTheWeek[(new Date(currentDate)).getDay()];
              oneDayForcast.threeHourForcast = tempDay3HourForcastArray;
              tempDay3HourForcastArray = [];
              this.basicFiveDayForcast.push(oneDayForcast);
              // oneDayForcast = new FullDayForcast; 
              oneDayForcast = { 
                         dayOfWeek: null,
                              date: null,
                           lowTemp: 1000,
                          highTemp: -1000,
                       currentTemp: 1000,
                   currentHumidity: 1000,
                       weatherMain: null,
                       weatherIcon: null,
                  threeHourForcast:[]
              };
              i = i + 1;
              currentDate = theDate;
            }
            // this.basicFiveDayForcast[i] = this.fiveDayEvery3Hours[j]
          }//end for
        console.log("this.basicFive-->"+ JSON.stringify(this.basicFiveDayForcast));
	  		this.isDoneLoading = true;
  		})
  		.catch(err => {
  			console.log("*** ERROR getting weather data-->"+err);
        this.isDoneLoading = true;
  		});
  }

}


//weather icons: http://openweathermap.org/img/w/01d.png