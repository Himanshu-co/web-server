const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./geocode')
const forecast = require('./forecast')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')


//test git
app.set('views', viewsPath)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Robot'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Robot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Robot'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address not provided!',
            name: 'Robot'
        })
    }
    geoCode(req.query.address, (error, { longitude, latitude, place_name } = {}) => {
        if (error) {
            return res.send({
                error,
                name: 'Robot'
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                place_name,
                forecastData

            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help Article cannot be found',
        name: 'Robot'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page cannot be found',
        name: 'Robot'
    })
})

app.listen(3000, () => { console.log("Server is up at port 3000!") })







// app.get('', (req, res) => {
//     res.send('Hello Express')
// })

// app.get('/help', (req, res) => {
//     res.send('Help Me!')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page!</h1>')
// })