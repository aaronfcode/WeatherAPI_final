const express = require('express')
const fetch = require('node-fetch')
const app = express()
const bodyParser = require('body-parser')


app.set("view engine", 'ejs')
app.use(express.static('css'))
app.use(bodyParser.urlencoded({extended: true}))


// GET method route
app.get('/', function (req, res) {
    console.log('POST request to the homepage')
    const theData = getWeather('')
    theData.then((weather) => {
        const weather_data = {weather : weather}
        res.render('weather', weather_data)
    })
  })
  // POST method route
app.post('/', function (req, res) {
    console.log('POST request to the homepage')
    const theData = getWeather(req.body.city_name)
    theData.then((weather) => {
        const weather_data = {weather : weather}
        res.render('weather', weather_data)
    })
})

const getWeather = (city) =>{
    if(city === ''){city = 'Toronto'}
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=236bc05c1ab1689a1783fb805b8db2b8`
    return fetch(url)
    .then((res) => res.json())
    .then((data) =>{
        let weather = {
            city: city,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon
        }
        return weather
    })
  }
// Declaring PORT
const port = process.env.PORT || 3000; // PORT is an environment variable that will be set by the process obj
// Set up listener
app.listen(port, () => {console.log(`Listening on ${port}...`)})