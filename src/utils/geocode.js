const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VtYW50aDE5NDciLCJhIjoiY2w4dHBmajJ1MGE4aTNva2kwaWJqaWloaSJ9.9Z5Z0PuLqlujNKP0D7xeCw&limit=1'

    request({ url: url, json: true }, (error, response) => {

        if (error){
            callback('unable to connect the location service', undefined)

        }else if(response.body.features.lenght === 0){
            callback('unable to connect the location service, tyr another way', undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name 
            })
        }


    })

}

module.exports = geocode