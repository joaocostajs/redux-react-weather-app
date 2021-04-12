export const CityLi = ({cities, k, showTemperatureOfCity, dispatch, deleteCity}) => {
    return   <div style={{display:"grid", gridTemplateColumns:"4fr 1fr"}}>
                 <p onClick={() => showTemperatureOfCity(cities[k].id)}>{cities[k].id} {cities[k].city},{cities[k].country} </p>
                   {/* <p>{cities[key].id} {cities[key].city},{cities[key].country} </p> */}
                  <img src="/trash.svg" alt="" onClick={() => dispatch(deleteCity(cities[k].id))}/>

             </div>
}