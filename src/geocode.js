const request = require('request')


//code to fetch coordinates 
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGltYW5zaCIsImEiOiJjazM3NGI2NDUwNW83M2duejdhYWYzcXgxIn0.Mnlssw3UsIv91IYvNX11ww'
    const jsonData = request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("Unable to Connect!", undefined)
        } else if (response.body.features.length === 0) {
            callback("Cannot find this location!", undefined)
        } else {
            const data = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name
            }
            callback(undefined, data)
        }

    })
}

module.exports = geoCode