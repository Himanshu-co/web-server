const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1f096fe6089af7bd1ccbd24161ad1977/' + longitude + ',' + latitude
    const jsonData = request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to access service', undefined)
        } else if (body.error) {
            callback('Unable to find location, Try Again!', undefined)
        } else {
            const forecastData = body.currently.summary + ". Temprature is " + body.currently.temperature + ". There is " + body.currently.precipProbability + "% chances of Rain today."
            callback(undefined, forecastData)
        }
    })
}

module.exports = forecast