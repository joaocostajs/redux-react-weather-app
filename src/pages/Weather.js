import axios from 'axios'
import {getWeather, getWeeklyWeather, testing} from '../fetch/fetches'
import {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {addCity, deleteCity} from '../actions'
import {DaysDisplay} from '../components/daysDisplay'
import {CityLi} from '../components/CityLi'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import {SearchSvg} from '../components/SVG/searchSvg'

import styled from 'styled-components'

const key = process.env.REACT_APP_API_KEY

function WeatherPage () {
    const cities = useSelector(state => state.cities)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const [tempDisplaying, setTempDisplaying] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    let city = cities["1"] ? cities["1"].city : "city"


// useEffect(() => {

// }, [tempDisplaying])



let lat = 0
// function showPosition(position) {
//     lat = position.coords.latitude
//     console.log("lat:",  position.coords.latitude)
// }

const [xGeeks, setxGeeks] = useState()
useEffect(() => {
    getWeeklyWeather().then(function(res){
        console.log("initial res", res)
        dispatch(addCity(res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily,res.response.data.current.weather[0].icon,res.response.data.current.weather[0].main))
        const currentWeather = [res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily, res.response.data.current.weather[0].icon,res.response.data.current.weather[0].main]
        console.log("current", currentWeather)
        setTempDisplaying(currentWeather)
    })
    console.log("effect")

    getWeather("Leiria").then(function(res){
            getWeeklyWeather(res.data.coord.lat, res.data.coord.lon).then(function(res2){
                //this setxGeeks should be improved since its irrelevant and just used to trigger the use effect related with xgeeks
                setxGeeks({res, res2})

                dispatch(addCity(res.data.name,res.data.sys.country, res2.current.temp, res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main))
            })
    })
   
}, [])
useEffect(() => {
console.log("xgeeks",xGeeks)
const leiria = cities.find(city => city.city === "Leiria")
setxGeeks(leiria)
}, [xGeeks])

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        if(search.length > 0){
            getCity(search)
        }else{
            store.addNotification({
                title: "Info",
                message: "Type a city before searching",
                type: "warning",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }

        })
    }
  }
}


if (window.navigator.geolocation) {
    // Geolocation available
    window.navigator.geolocation
    .getCurrentPosition(console.log, console.log);
   } 



const getCi = getWeather(search)



function getCity(){
// verify if we have this search city already
if( cities.find(item => item.city.toLowerCase() === search.toLowerCase())) return  store.addNotification({
    title: "Info",
    message: "You already have the searched city",
    type: "info",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true
    }
  });



getCi.then(function(result) {
    console.log("testing", result)
    const searchResult = result
    console.log("result from search here", searchResult)
    //if our search fails then ask the user to provide a valid search
    if (searchResult === undefined) return store.addNotification({
        title: "Warning",
        message: "Type a valid city on the search",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });

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


const Input = styled.input`
border:none;
border-bottom:1px solid #777;
background-color:transparent;
opacity:.7;
transition:.2s ease all;
    &:focus {
        outline: none;
        box-shadow: none;
        border-bottom:1px solid black;
    }
    &:hover{
        opacity:1;

    }
`



    return (
        <div>
        <ReactNotification />
        <div style={{display:"grid", gridTemplateColumns:"1fr 300px"}}>
             <div >
             {tempDisplaying ? 
             <div style={{height:"70vh",display:"grid", alignItems:"center",marginLeft:"4em" }}>   
             <div>
                <h1 style={{fontSize:"5em", display:"inline-block", marginRight:".5em"}}>{tempDisplaying[2]} º</h1>
                <div style={{display:"inline-block"}}>
                <h1 style={{display:"inline-block"}}>{tempDisplaying[0]}</h1>
                <p >{tempDisplaying[1]}</p>
             </div>
        
            <p style={{display:"inline-block", marginLeft:"2em"}}>{tempDisplaying[5]}  <img style={{position:"relative", top:"1em"}} src={"http://openweathermap.org/img/w/" +  tempDisplaying[4] + ".png"} alt=""/>   </p>
            </div>
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
                <div style={{marginBottom:"2em"}}>
                    <input type="text" placeholder="search for city" style={{width:"80%"}}  onChange={ (e) => setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
                    <div style={{backgroundColor:"white", display:"inline-block"}} onClick={() => getCity(search)}>
                        <SearchSvg />
                    </div>
                </div>
           
             {cities["1"] ? Object.keys(cities).map((key, idx) =>
            //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
            idx === 0 ? '' :
            cities[key].city === "Leiria" ? '' :
                 <CityLi cities={cities} k={key} showTemperatureOfCity={showTemperatureOfCity} dispatch={dispatch} deleteCity={deleteCity} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
            ) : null}

            </div>
            

<div>
    XGeeks
    {xGeeks && <p onClick={() => showTemperatureOfCity(xGeeks.id)}>{xGeeks.city}</p>}
</div>

    <div>
        <p>current location weather</p>
        {cities[0] ? 
        <p onClick={() => showTemperatureOfCity(cities[0].id)}> { cities[0].city},{ cities[0].country}</p>
        : "null"}
    </div>


        </div>
        </div>
        </div>
       
    )
}

export default WeatherPage;