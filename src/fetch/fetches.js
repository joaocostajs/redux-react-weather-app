import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

var getIP = 'http://ip-api.com/json/';


export function getWeather(search) {

    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + "&appid=" + key + "&units=metric"
    console.log(url)


            axios.get(url )
                .then(function(response){
                    console.log("here it is:", response)
                    
                })
}


export  function getWeeklyWeather() {
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' 
    console.log("getWeekly")
    axios.get(getIP)
        .then(function(response){
            console.log("getIP", response)
            const {lat, lon} = {...response.data}
            axios.get(url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric")
                .then(function(response){
                    console.log("here the week:", response.data)
                    return response.data
                })
            
        })
}