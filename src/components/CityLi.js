export const CityLi = () => {
    return   <div style={{display:"grid", gridTemplateColumns:"4fr 1fr"}}>
                 <p onClick={() => showTemperatureOfCity(cities[key].id)}>{cities[key].id} {cities[key].city},{cities[key].country} </p>
                   {/* <p>{cities[key].id} {cities[key].city},{cities[key].country} </p> */}
                  <img src="/trash.svg" alt="" onClick={() => dispatch(deleteCity(cities[key].id))}/>

             </div>
}