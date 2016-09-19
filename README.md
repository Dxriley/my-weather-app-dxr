# my-weather-app-dxr
# DXR's 5 day weather web app - [Hosted sample app](http://dxr_sample.comxa.com)
## How to build this app
  * Must have Ionic 2 enviornment installed (requires Node.js)
    * Instructions : http://ionicframework.com/getting-started/
  * After installing Ionic 2 and cloning repository
    * open a terminal window and change to the cloned directory
    * in terminal window type 'ionic serve'
    * this should build and open the local web site
  * As changes occur with ionic serve running it will live build and reload
  * No automated tests, all testing was manual
    * I have not used use Jasmine or Karma, but they seem to be favored for automated tests
    * Worked in Safari and Chrome.  Did not work in IE9.

## TODO's
  * BUG: Adjust the date-time to be in the City's weather time zone
  * Add: Hide all but 1 day's 3hr forcast and make all the days clickable to show that day's detail forcast
  * Add: DayBoxes: Gather and display more day data.  Need to decide how to average the displayed data.  All in all I would like to research more of what to display... Morning info, or just day time info, evening or just 24hr averages.
  * Add: degree F on 3hr boxes and display more data that came from weather source
  * Add: click event and function to switch units
  * Add: Pick/type a city; need to download the city list from the site; and add filtering as typing
  * Add: All boxes add weather icon from weather source
  * NiceToHave: Try Google site translator for multiple languages
  * Oportunity: Learn use of Typescript interfaces and objects
  * Oportunity: Refactor data processing to another function for use of switching units

