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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var openWeatherAppId = "37ecf81509e93c40807891b21e96363c";
var baseURL = "";
var WeatherService = (function () {
    function WeatherService(http) {
        this.http = http;
    }
    WeatherService.prototype.getWeather = function (city) {
        var _this = this;
        // * http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=37ecf81509e93c40807891b21e96363c
        // * Examples of API calls:
        // * standard api.openweathermap.org/data/2.5/find?q=London
        // * metric api.openweathermap.org/data/2.5/find?q=London&units=metric
        // * imperial api.openweathermap.org/data/2.5/find?q=London&units=imperial
        var appId = '';
        var baseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
        //var city = "Denver,us";
        var modeURLComponent = "&mode=json";
        var units = "imperial"; //units options metric or imperial
        var getRequestURL = baseURL + city + modeURLComponent + "&appid=" + openWeatherAppId + "&units=" + units;
        var forecast;
        // var headers = new Headers();
        // headers.append('X-Parse-Application-Id', '2gBclkQMbECCFK8l5QQarvVSJC0WWkVFdEovOUf0');
        // headers.append('X-Parse-REST-API-Key','0i2XpIOtg8gUkV0UDUxbcbOGT4STHJr68Hzcw3MI');
        // var options = new RequestOptions({headers: headers});
        return new Promise(function (resolve) {
            //this.http.get('https://api.parse.com/1/classes/Adhesi');
            _this.http.get(getRequestURL)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.weatherData = data;
                console.log("Weather data -->" + JSON.stringify(data));
                resolve(_this.weatherData);
                //this.data = data;
                //resolve(this.data);
            }, function (err) { return console.log(err); }, function () { return console.log(); });
        });
    };
    WeatherService.prototype.getCurrentWeather = function (city) {
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
