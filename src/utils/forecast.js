const request = require('request')

const forecast  = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=084c7b8e3eae948cc2031f5a758db7e1&query=' + latitude + ',' + longitude +'&units=f'

    request({ url:url, json: true}, (error, response) => {
        if (error) {
            callback('unable to find the weather service', undefined)

        }else if (response.body.error){
            callback('unable to find the location', undefined)

        }else{
            callback(undefined, response.body.current.weather_descriptions +' It is currently ' + response.body.current.temperature + ' degress out.')

        }

    })
}
module.exports = forecast