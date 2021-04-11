import axios from 'axios'
import {getWeather, getWeeklyWeather, testing} from '../fetch/fetches'
import {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {addCity, deleteCity} from '../actions'


const key = process.env.REACT_APP_API_KEY

function WeatherPage () {
    const cities = useSelector(state => state.cities)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const [tempDisplaying, setTempDisplaying] = useState({})

    let city = cities["1"] ? cities["1"].city : "city"


useEffect(() => {

}, [tempDisplaying])
    // getWeather()


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
    getWeeklyWeather().then(function(res){
        console.log("initial res", res)
        dispatch(addCity(res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily))
        const currentWeather = [res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily]
        console.log("current", currentWeather)
        setTempDisplaying(currentWeather)
    })
   
}, [])

function inputChange(e) {
console.log(e.target.value)
setSearch(e.target.value)
}

const getCi = getWeather(search)



function getCity(){
getCi.then(function(result) {
    console.log("testing", result)
    const searchResult = result
    // once i know the city i can then fetch info about it
    const allDays = getWeeklyWeather(result.data.coord.lat, result.data.coord.lon)

    allDays.then(function(result) {
        console.log("got all days for the searched city", result)
        getWeeklyWeather(searchResult.data.coord.lat,searchResult.data.coord.lon, searchResult.data.name, searchResult.data.sys.country).then(function(result) {
       console.log("all days", result) })
             dispatch(addCity(searchResult.data.name,searchResult.data.sys.country, result.current.temp, result.daily))
        })
 })

}


function showTemperatureOfCity(cityId){
    const clicked = cities.find(city => city.id === cityId)
    console.log("clicked",clicked)
    const currentWeather = [clicked.city,clicked.country, clicked.temp, clicked.nextSevenDays]
    setTempDisplaying(currentWeather)
}



    return (
       
        <div style={{display:"grid", gridTemplateColumns:"4fr 2fr"}}>
             {console.log("rendering.........")}
             <div>

             <h1 onClick={() => test()}>Weather page</h1>

<p>{tempDisplaying ? tempDisplaying[0] : "Loading"}</p>
<p>{tempDisplaying ? tempDisplaying[1] : "Loading"}</p>
<p>{tempDisplaying ? tempDisplaying[2] : "Loading"}</p>
{console.log("temp",tempDisplaying[3])}
<div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)"}}>
{tempDisplaying[3] ? Object.keys(tempDisplaying[3]).map((key, idx) =>
                    //if idx is zero it means its today and we dont want it soo we dont return anything when is zero

                    idx === 0 ? '' :
                    <div>
                        <p>{String(new Date(tempDisplaying[3][key].dt * 1000)).split(" ")[0]}</p>
                        <p>min temp: {tempDisplaying[3][key].temp.min}</p>
                        <p>max temp: {tempDisplaying[3][key].temp.max}</p>
                        <p>feels like: {tempDisplaying[3][key].weather[0].main}</p>
                    </div>
                    ) : null}
</div>

           
             
              </div>

        <div>
             <input type="text" placeholder="search for city" style={{width:"80%"}} onChange={inputChange}/>
            <button onClick={() => getCity(search)}>search</button>
           
             {cities["1"] ? Object.keys(cities).map((key, idx) =>
            //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
            idx === 0 ? '' :
            <div>
             <button onClick={() => showTemperatureOfCity(cities[key].id)}> <p>{cities[key].id} {cities[key].city},{cities[key].country} </p></button>
                  {/* <p>{cities[key].id} {cities[key].city},{cities[key].country} </p> */}
                  <button onClick={() => dispatch(deleteCity(cities[key].id))}>delete</button>
              </div>
              ) : null}
        </div>
        </div>
       
       
    )
}

export default WeatherPage;