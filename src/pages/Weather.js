import axios from 'axios'
import {getWeather, getWeeklyWeather} from '../fetch/fetches'
import {useState, useEffect} from 'react';
import { geolocated } from "react-geolocated";
import {useSelector, useDispatch} from 'react-redux';
import {addCity, deleteCity} from '../actions'


const key = process.env.REACT_APP_API_KEY

function WeatherPage () {
    const weather = useSelector(state => state.weather)
const [search, setSearch] = useState("")

    console.log("weathaaaa",weather["1"])
    console.log(weather)
    let city = weather["1"] ? weather["1"].city : "city"
    console.log("the state:",weather)
    // getWeather()

const location = () =>{
    if (navigator.geolocation) {
        console.log("enabled")
        console.log( navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
               }))
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        return "Geolocation is not supported by this browser.";
      }
}
let lat = 0
function showPosition(position) {
    lat = position.coords.latitude
    console.log("lat:",  position.coords.latitude)
}

async function test(){
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' 
    console.log("getWeekly")
    let city = ""
    let country = ""
    axios.get("http://ip-api.com/json/")
        .then(function(response){
            console.log("getIP", response)
            const {lat, lon} = {...response.data}
            city = response.data.city
            country = response.data.country
            axios.get(url + lat +"&lon=" + lon + "&exclude=minutely,alerts,hourly" +  "&appid=" + key + "&units=metric")
                .then(function(response){
                    console.log("here the week:", response.data)
                    dispatch(addCity(city,country, response.data.current.temp, response.data.daily))
                })
            
        })
   
}
useEffect(() => {
    test()
}, [])

function inputChange(e) {
console.log(e.target.value)
setSearch(e.target.value)
}


const dispatch = useDispatch()

    return (
       
        <div style={{display:"grid", gridTemplateColumns:"4fr 2fr"}}>
             {console.log("rendering.........")}
             <div>

            
             <h1 onClick={() => test()}>Weather page</h1>
             {console.log(weather.length)}
              <p> {city}</p> 
              <p> {weather["1"] ? Math.round(Number(weather["1"].temp)) : "city"}</p>
              <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)"}}>
                    {weather["1"] ? weather["1"].nextSevenDays.map((item, idx) =>
                    //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
                    idx === 0 ? '' :
                    <div>
                        <p>min temp: {item.temp.min}</p>
                        <p>max temp: {item.temp.max}</p>
                        <p>feels like: {item.weather[0].main}</p>
                    </div>
                    ) : null}
              </div>
             
              </div>

        <div>
             <input type="text" placeholder="search for city" style={{width:"80%"}} onChange={inputChange}/>
            <button onClick={getWeather(search)}>search</button>
           
             {weather["1"] ? Object.keys(weather).map((key, idx) =>
            //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
            idx === 0 ? '' :
            <div>
             
                  <p>{weather[key].id} {weather[key].city},{weather[key].country} </p>
                  <button onClick={() => dispatch(deleteCity(weather[key].id))}>delete</button>
              </div>
              ) : null}
        </div>
        </div>
       
       
    )
}

export default WeatherPage;