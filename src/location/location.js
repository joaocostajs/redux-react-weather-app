import axios from 'axios'
import { SaveNewCity } from '../components/saveNewCity'


import {addCity} from '../actions'
const key = process.env.REACT_APP_API_KEY



export function getCoordsByName(search, dispatch){
    
    return axios.get(`https:/api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`).then(function(res){
       console.log("the res:", res)
        const coords = {
            latitude: res.data.coord.lat,
            longitude: res.data.coord.lon
        }

        fetchCity(coords, dispatch)
    })
}

export function getLocation(setTempDisplaying,dispatch, addCity){
 
    if (window.navigator.geolocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                console.log(position)
            //    fetchCityWeather(position.coords).then(response =>  dispatch(addCity(searchResult.data.name,searchResult.data.sys.country, result.current.temp, result.daily, result.current.weather[0].icon, result.current.weather[0].main)))
               fetchCity(position.coords,setTempDisplaying,dispatch,addCity)
               
            //    fetchCityWeather(position.coords).then(response => setTempDisplaying(response))
            },function(error){
                fetchCity()
             }) 

            
          } else { 
           alert( "Geolocation is not supported by this browser.")
          }
    }
}

function saveNShow (response,dispatch){
    console.log("ddddddd", dispatch)
    console.log("savenSHow", response)
    dispatch(addCity(response))
    console.log("worksr")
}

export default function fetchCity(coords,dispatch){
    return axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}&units=metric`).then(function(response){
        const data = {
            city: response.data.name,
            country: response.data.sys.country
        }
        axios.get( `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=minutely,alerts,hourly&appid=${key}&units=metric`).then(function(response){
        const newCity = {
            city: data.city,
            country: data.country,
            temp: response.data.current.temp,
            nextDays: response.data.daily,
            icon: response.data.current.weather[0].icon,
            condition: response.data.current.weather[0].description
        }
       return newCity
    }).then(function(response){
        saveNShow (response,dispatch)
    })
})
   

   
}