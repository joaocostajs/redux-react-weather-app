import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

var getIP = 'http://ip-api.com/json/';




export async function getWeather(search) {
    if(search)
try{
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + "&appid=" + key + "&units=metric"

    //first i search for the city the user inputed and save latitude, longitude 
    const res = await axios.get(url)
    .then(function(response){
       return response
    })
    return res
} catch(err){
    console.error(err)
}           
}


export async function getWeeklyWeather() {
    try{
        let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' 
        let {lat, lon} = [39.74362, -8.80705]
        if(arguments[0] && arguments[1]){
            /* eslint no-restricted-syntax: ["error"] */
            lat = arguments[0]
            lon = arguments[1]

            const res = await axios.get(`${url}${lat}&lon=${lon}&exclude=minutely,alerts,hourly&appid=${key}&units=metric`)
            // const res = await axios.get(`${url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric"}`)
            .then(function(response){
                return response.data
            })
            return res
        
        
        }else{
            let allres 
            await axios
            .get(getIP)
            .then(function(response){
                const i = response
                /* eslint no-restricted-syntax: ["error"] */
                //getting current user lat and lon
                lat = response.data.lat
                lon = response.data.lon
                const res2 = axios.get(`${url}${lat}&lon=${lon}&exclude=minutely,alerts,hourly&appid=${key}&units=metric`)
                    .then(function(response){
                        console.log("here the week:", response.data)
                          /* eslint no-restricted-syntax: ["error"] */
                        const all = {response,i}
                        allres = all
                        
                          const r  = response.data
                            /* eslint no-restricted-syntax: ["error"] */
                        return response.data, i
                    })
                    return res2
            })
            return allres
        }
    }catch(err){
        console.error(err)
    }
}



export function getCity(cities, search, store, notification, setTempDisplaying, dispatch, addCity){
    // verify if we have this search city already
    if( cities.find(item => item.city.toLowerCase() === search.toLowerCase())) return  store.addNotification(notification("Info", "You already have this city searched", "info"))
    //if we dont have it then we proceed to add it
    const getCity = getWeather(search)
    getCity.then(function(result) {
        const searchResult = result
        //if our search fails then ask the user to provide a valid search
        if (searchResult === undefined) return  store.addNotification(notification("Warning", "Type a valid city on the search","danger"))
    
        // once i know the city i can then fetch info about it
        getWeeklyWeather(result.data.coord.lat, result.data.coord.lon)
                .then(function(result) {
                 // add new city to the screen of the user
                 const currentWeather = [searchResult.data.name, searchResult.data.sys.country,result.current.temp, result.daily, result.current.weather[0].icon, result.current.weather[0].main ]
                 setTempDisplaying(currentWeather)

                 // add new city to redux store
                 dispatch(addCity(searchResult.data.name,searchResult.data.sys.country, result.current.temp, result.daily, result.current.weather[0].icon, result.current.weather[0].main))
            })
     })
    }
