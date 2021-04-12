import axios from 'axios'
import {getWeather, getWeeklyWeather, testing} from '../fetch/fetches'
import {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {addCity, deleteCity} from '../actions'
import {DaysDisplay} from '../components/daysDisplay'

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


useEffect(() => {
    getWeeklyWeather().then(function(res){
        console.log("initial res", res)
        dispatch(addCity(res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily,res.response.data.current.weather[0].icon))
        const currentWeather = [res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily, res.response.data.current.weather[0].icon]
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

// verify if we have this search city already
if( cities.find(item => item.city.toLowerCase() === search.toLowerCase())) return alert("we have it")



getCi.then(function(result) {
    console.log("testing", result)
    const searchResult = result
    // once i know the city i can then fetch info about it
    const allDays = getWeeklyWeather(result.data.coord.lat, result.data.coord.lon)

    allDays.then(function(result) {
        console.log("got all days for the searched city", result)
        getWeeklyWeather(searchResult.data.coord.lat,searchResult.data.coord.lon, searchResult.data.name, searchResult.data.sys.country).then(function(result) {
       console.log("all days", result) })
             dispatch(addCity(searchResult.data.name,searchResult.data.sys.country, result.current.temp, result.daily, result.current.weather[0].icon))
        })
 })

}


function showTemperatureOfCity(cityId){
    const clicked = cities.find(city => city.id === cityId)
    console.log("clicked",clicked)
    const currentWeather = [clicked.city,clicked.country, clicked.temp, clicked.nextSevenDays, clicked.icon ]
    setTempDisplaying(currentWeather)
}

    return (
       
        <div style={{display:"grid", gridTemplateColumns:"4fr 2fr"}}>
             {console.log("rendering.........")}
             <div>
             <h1>Weather page</h1>
             {tempDisplaying ? 
             <div>   
             <img src={"http://openweathermap.org/img/w/" +  tempDisplaying[4] + ".png"} alt=""/>    
            <h1>{tempDisplaying[0]}</h1>
            <p>{tempDisplaying[1]}</p>
            <h1>{tempDisplaying[2]}</h1>
</div>
: "loading"}
<center>
<div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))", gap:"1em", width:"90%"}}>
{tempDisplaying[3] ? Object.keys(tempDisplaying[3]).map((key, idx) =>
                    //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
                    idx === 0 ? '' :
                    <DaysDisplay item={tempDisplaying[3]} k={key}/>
                    ) : null}
</div>
</center>

           
             
              </div>

        <div style={{height:"calc(100vh - 4em)",backgroundColor:"aliceBlue", padding:"2em 0"}}>
            <div style={{height:"80vh"}}>
            <input type="text" placeholder="search for city" style={{width:"80%"}} onChange={inputChange}/>
            <button onClick={() => getCity(search)}>search</button>
           
             {cities["1"] ? Object.keys(cities).map((key, idx) =>
            //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
            idx === 0 ? '' :
            <div>
             <p onClick={() => showTemperatureOfCity(cities[key].id)}>{cities[key].id} {cities[key].city},{cities[key].country} </p>
                  {/* <p>{cities[key].id} {cities[key].city},{cities[key].country} </p> */}
                  <button onClick={() => dispatch(deleteCity(cities[key].id))}>delete</button>
              </div>
              ) : null}

            </div>
            



    <div>
        <p>current location weather</p>
        {cities[0] ? 
        <p onClick={() => showTemperatureOfCity(cities[0].id)}> { cities[0].city}</p>
        : "null"}
    </div>


        </div>
        </div>
       
       
    )
}

export default WeatherPage;