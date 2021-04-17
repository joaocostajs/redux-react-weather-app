import styled from 'styled-components'


import '../App.css'


const SVG = styled.svg`
stroke:black;
transition: .3s ease all;
`


function showTemperatureOfCity(cityId, setTempDisplaying, cities){
  const clicked = cities.find(city => city.id === cityId)
  const currentWeather = [clicked.city,clicked.country, clicked.temp, clicked.nextSevenDays, clicked.icon, clicked.condition ]
  setTempDisplaying(currentWeather)
}


export const CityLi = ({cities, k,  dispatch, deleteCity, setState, state, setTempDisplaying}) => {

  if(cities[k]){
          return <div className={ state === k ? 'liElement active' : 'liElement'} > 
                    <div onClick={() => {showTemperatureOfCity(cities[k].id, setTempDisplaying, cities); setState(k)}}>
                      <h2> {cities[k].city} </h2>
                      <p> {cities[k].country} </p>
                    </div>
                    {deleteCity ? 
                    <SVG className="sv" onClick={() => { dispatch(deleteCity(cities[k].id)); setState(); showTemperatureOfCity(cities[0].id, setTempDisplaying, cities)} }  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></SVG>
                  : null
                  }
                </div>
  }
   return null
}