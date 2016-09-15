"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var weather_service_1 = require("../../providers/weather-service/weather-service");
var HomePage = (function () {
    function HomePage(navCtrl, weather) {
        this.navCtrl = navCtrl;
        this.weather = weather;
        this.isDoneLoading = false;
        this.city = { name: "Denver, US", apiCity: "Denver, US" };
        this.dayOfTheWeek = new Array(7);
        this.getTheWeatherFor(this.city.apiCity);
        this.dayOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }
    HomePage.prototype.getTheWeatherFor = function (apiCity) {
        var _this = this;
        this.isDoneLoading = false;
        this.weather.getWeather(this.city.apiCity)
            .then(function (weatherData) {
            _this.fiveDayEvery3Hours = weatherData["list"];
            console.log("fiveDayEvery3Hours-->" + JSON.stringify(_this.fiveDayEvery3Hours));
            for (var i = _this.basicFiveDayForcast.length - 1; i >= 0; i--) {
                _this.basicFiveDayForcast[i];
            }
            _this.isDoneLoading = true;
        })
            .catch(function (err) {
            console.log("*** ERROR getting weather data-->" + err);
        });
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, weather_service_1.WeatherService])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//weather icons: http://openweathermap.org/img/w/01d.png 
