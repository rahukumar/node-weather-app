const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const utils = require('./utils/utils');

const port = process.env.PORT || 3000;


//  THIS GIVE CURRENT DIRECTOR PATH AND CURRENT FILE PATH;
console.log(__dirname); // SRC PATH
console.log(__filename); // APP.JS PATH
console.log(path.join(__dirname));

const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../templates/views');
const PatialsDirectoryPath = path.join(__dirname, '../templates/partials');

app.set('views', viewDirectoryPath) // THIS WE CAN USE TO POINT TO VIEWS INSIDE PUBLIC FOLDER
app.set('view engine', 'hbs');
hbs.registerPartials(PatialsDirectoryPath);


app.use(express.static(publicDirectoryPath)); // this will point to public directory now.

app.get('', (req, res) => {
    res.render('index', { name: 'Weather', designation: 'APP' });
})

app.get('/about', (req, res) => {
    res.render('about', { name: 'rahul', designation: 'PDE' });
})

app.get('/help', (req, res) => {
    res.render('help', { name: 'rahul', designation: 'PDE' });
})

//WE CAN SEND HTML AND JSON AS THE RESPNSE
// app.get('', (req, res) => {
//     res.send('<h1>Hello</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{ name: 'rahul' }, { name: 'kumar' }])
// })
// app.get('/about', (req, res) => {
//     res.send('about page')
// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address data.'
        })
    }

    utils.geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        let geocode = response;
        utils.forecast(response.latitude, response.longitude, (error, response) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                geocode: geocode,
                temperature: response
            })
        })
    })

    // res.send({
    //     forecast:'it\'s raining',
    //     location: req.query.loc || 'Telangana',
    //     address:req.query.address
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'Please provide the search data'
        })
    }
    res.send({
        products: []
    })
})

//THIS * SHOULD BE PLACED AT THE BOTTOM AS NODE CHECKS ALL THE ROUTES FROM TOP TO BOTTOM
app.get('/help/*', (req, res) => {
    res.render('404')
})
app.get('*', (req, res) => {
    res.render('404')
})


app.listen(port, () => {
    console.log('server is up and running on port'+port);
})