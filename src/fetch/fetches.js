import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

var getIP = 'http://ip-api.com/json/';



export const testing = async () => {
    try{
        const res = await axios.get(getIP).then(function(response){return response})
        return res
    }catch(err){
        console.error(err)
    }
}




export async function getWeather(search) {

    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + "&appid=" + key + "&units=metric"
    console.log("searching")


           const res = axios.get(url)
                .then(function(response){
                    console.log("res",response)
                    let {lon, lat} = {...response.data.coord}
                    console.log("here it is:", response)
                    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' 
                    console.log("getWeekly")
                    
                    if(arguments[0] && arguments[1]){
                        console.log("we have arguments")
                        lat = arguments[0]
                        lon = arguments[1]
                         axios.get(url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric")
                        .then(function(response){
                            console.log("here the week:", response.data)
                
                            // I can now dispatch this city to redux store
                          
                            return response.data
                        })
                    
                    
                    }else{
                        // await axios.get(getIP)
                        // .then(function(response){
                        //     console.log("getIP", response)
                          
                            
                        //            lat= response.data.lat
                        //            lon= response.data.lon
                                
                
                            
                        //     axios.get(url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric")
                        //         .then(function(response){
                        //             console.log("here the week:", response.data)
                        //             return response.data
                        //         })
                            
                        // })
                
                    }
                })
                console.log("res",res)
                return res
                
}


export async function getWeeklyWeather() {
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' 
    console.log("getWeekly")
    let {lat, lon} = [39.74362, -8.80705]
    if(arguments[0] && arguments[1]){
        console.log("we have arguments")
        lat = arguments[0]
        lon = arguments[1]
        await axios.get(url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric")
        .then(function(response){
            console.log("here the week:", response.data)

            // I can now dispatch this city to redux store
          
            return response.data
        })
    
    
    }else{
        await axios.get(getIP)
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