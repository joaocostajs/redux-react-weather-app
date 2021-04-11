import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

var getIP = 'http://ip-api.com/json/';


export function getWeather(search) {

    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + "&appid=" + key + "&units=metric"
    console.log("searching")


            axios.get(url )
                .then(function(response){
                    const {lon, lat} = {...response.data.coord}
                    console.log("here it is:", response)
                    getWeeklyWeather(lon,lat)
                })
}


export  function getWeeklyWeather() {
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' 
    console.log("getWeekly")
    let {lat, lon} = [39.74362, -8.80705]
    if(arguments[0] && arguments[1]){
        console.log("we have arguments")
        lat = arguments[0]
        lon = arguments[1]
        axios.get(url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric")
        .then(function(response){
            console.log("here the week:", response.data)
            return response.data
        })
    
    
    }else{
        axios.get(getIP)
        .then(function(response){
            console.log("getIP", response)
          
            
                   lat= response.data.lat
                   lon= response.data.lon
                

            
            axios.get(url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric")
                .then(function(response){
                    console.log("here the week:", response.data)
                    return response.data
                })
            
        })

    }
   
}