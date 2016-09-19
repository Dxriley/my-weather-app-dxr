import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WeatherService } from "../../providers/weather-service/weather-service";

//FuBar! I need to change all the date-times to local weather time! OMG... :(



//TODO: figure how to do interfaces and initialize fctn... or perhaps do objects --Riley
// interface City {
//   name: string;
//   apiCity: string;
// }

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
	  		//console.log("fiveDayEvery3Hours-->" + JSON.stringify(this.fiveDayEvery3Hours)); 
        var previousDate = null;
        var theDate = null;
        var currentTemp = 0;
        var currentHumidity = 0;
        var i = 0;

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
            threeHourForcast:  [],
         unitOfMeasureSymbol: "&#8457;"
          };
        var tempDay3HourForcastArray = [];
        for (var j = 0; j <= this.fiveDayEvery3Hours.length - 1; j++) {
          var aDate = new Date(this.fiveDayEvery3Hours[j].dt*1000); //REMOVE: Miss understood this value --Riley
          //2016-09-17 09:00:00 //REMOVE: dt_txt format for substring --Riley
          console.log(aDate.toISOString());
          console.log(this.fiveDayEvery3Hours[j].dt_txt);
          var theDay = this.fiveDayEvery3Hours[j].dt_txt.substring(8,10);
          var theMonth = this.fiveDayEvery3Hours[j].dt_txt.substring(5,7);
          var theYear = this.fiveDayEvery3Hours[j].dt_txt.substring(0,4);
          theDate = theMonth+"/"+theDay+"/"+theYear;
          if (j==0) {
            previousDate = theDate;
          }
          //Store and prep for new day
          if (theDate != previousDate) { 
            //TODO: dup. code refactor to function --Riley
            oneDayForcast.date = previousDate;
            oneDayForcast.dayOfWeek = this.dayOfTheWeek[(new Date(previousDate)).getDay()];
            oneDayForcast.threeHourForcast = tempDay3HourForcastArray;
            tempDay3HourForcastArray = [];
            this.basicFiveDayForcast.push(oneDayForcast);

            oneDayForcast = { 
                       dayOfWeek: null,
                            date: null,
                         lowTemp: 1000,
                        highTemp: -1000,
                     currentTemp: 1000,
                 currentHumidity: 1000,
                     weatherMain: null,
                     weatherIcon: null,
                threeHourForcast:[],
             unitOfMeasureSymbol: "&#8457;"
            };
            // i = i + 1;
            previousDate = theDate;
          }
          // console.log("*******this.fiveDayEvery3Hours["+j+"].temp->"+ this.fiveDayEvery3Hours[j].main.temp
          //   +" ---- "+this.fiveDayEvery3Hours[j].dt_txt);
          // console.log("previousDate->"+previousDate+ " : theDate->"+theDate)
          //TODO: get other weather stuff --Riley
          tempDay3HourForcastArray.push(this.fiveDayEvery3Hours[j]);
          if (oneDayForcast.highTemp < this.fiveDayEvery3Hours[j].main.temp) {
            oneDayForcast.highTemp = this.fiveDayEvery3Hours[j].main.temp;
          }
          if (oneDayForcast.lowTemp > this.fiveDayEvery3Hours[j].main.temp) {
            oneDayForcast.lowTemp = this.fiveDayEvery3Hours[j].main.temp;
          }
          //TODO: Add: just take the mainweather as day's word forcast ie(Sunny) --Riley
          if (true == true) { //Perhaps pick noon as the weater word of the day. --Riley
            // NOTE: weather icons: http://openweathermap.org/img/w/01d.png --Riley

          }
        }//end for loop
        //Store last day
        //TODO: dup. code refactor to function --Riley
        oneDayForcast.date = previousDate;
        oneDayForcast.dayOfWeek = this.dayOfTheWeek[(new Date(previousDate)).getDay()];
        oneDayForcast.threeHourForcast = tempDay3HourForcastArray;
        tempDay3HourForcastArray = [];
        this.basicFiveDayForcast.push(oneDayForcast);

        //console.log("this.basicFive-->"+ JSON.stringify(this.basicFiveDayForcast));
	  		this.isDoneLoading = true;
  		})
  		.catch(err => {
  			console.log("*** ERROR getting weather data-->"+err);
        this.isDoneLoading = true;
  		});
  }

}


