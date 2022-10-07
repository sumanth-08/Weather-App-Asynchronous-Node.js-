const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')


const app = express()

console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


app.set('view engine', '.hbs')
app.use(express.static(path.join(publicDirectoryPath)))
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('/index', (req, res) => {
    res.render('index', {
    name: 'sumanth',
    title: 'Weather'
    }

    )
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
        name: 'sumanth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'sumanth',
        title: 'Help'
    })

})



// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) =>{
//     res.send([{
//         name: 'elon',
//         age: 22
//     },
//     {
//         name: 'sunder pechai',
//         age: 32
//     }
// ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About pagess</h1>')
// })

app.get('/weather', (req, res) =>{

    if (!req.query.address){
        return res.send({
            error: 'You must provide the address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitute, location} = {} )=> {
        if (error){
            return res.send({error:error})

        }
        forecast(latitude, longitute, (error, foreccastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: foreccastData,
                location: location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast: 'rainy',      
    //     location: 'kolkata',
    //     address: req.query.address
    // })
})


app.get('/product', (req, res) => {

    if (!req.query.search){
        return res.send({
            erro: 'You must provide a search term'
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) =>{
   res.render('error', {
    name: 'sumanth',
    title:'404 error',
    errorMsg: 'opps something went wrong'
   })
})

app.get('*', (req, res) =>{ 
    res.render('error',{
        title: '404',
        name: 'sumanth',
        errorMsg: 'Page not found',

    })
})

app.listen(3000, () => {
    console.log('Server up to port 3000')
})