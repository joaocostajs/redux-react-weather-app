import {ReactNotification, notification, store, useState, useEffect, useSelector, useDispatch, addCity, deleteCity, DaysDisplay, CityLi, SearchSvg, Input, getWeather, getWeeklyWeather, getCity, MainWeatherDisplay} from './weatherImports';

function WeatherPage () {
    const cities = useSelector(state => state.cities)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const [tempDisplaying, setTempDisplaying] = useState({})
    const [activeIndex, setActiveIndex] = useState()
    const [xGeeks, setxGeeks] = useState()
    const [currentLocation, setCurrentLocation] = useState(false)


    useEffect(() => {
        //when page loads get the current location and also add location for XGeeks Leiria
        getLocation()
       
        // getWeeklyWeather()

        // })

       
    }, [])
    useEffect(() => {
        if(currentLocation){
            getWeather("Leiria").then(function(res){
                getWeeklyWeather(res.data.coord.lat, res.data.coord.lon).then(function(res2){
                    setxGeeks({res, res2})
                    dispatch(addCity(res.data.name,res.data.sys.country, res2.current.temp, res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main))
                })
            }) 

        } 
    },[currentLocation])

    useEffect(() => {
        // wait to have leiria location and then display it otherwise dont show
        const leiria = cities.find(city => city.city === "Leiria")
        setxGeeks(leiria)
    }, [xGeeks])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(search.length > 0){
                console.log("the cities before", cities)
                getCity(cities, search, store, notification, setTempDisplaying, dispatch, addCity)
            }else{
                store.addNotification(notification("Info","Type a city before searching","warning"))
            }
        }
    }
function getLocation(){


    if (window.navigator.geolocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
          } else { 
           alert( "Geolocation is not supported by this browser.")
          }
    }
}
function showPosition(position) {
    console.log("PPPPPPPP",position)
            getWeeklyWeather(position.coords.latitude,  position.coords.longitude).then(function(res){
                console.log("RRRRRR", res)   
                const cityName = res.timezone.split("/")[1]

                   getWeather(cityName).then(function(res){
                    getWeeklyWeather(res.data.coord.lat, res.data.coord.lon).then(function(res2){
                        setxGeeks({res, res2})
                        dispatch(addCity(res.data.name,res.data.sys.country, res2.current.temp, res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main))
                        const currentWeather = [res.data.name,res.data.country, res2.current.temp,res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main ]
                        setTempDisplaying(currentWeather)
                    })
                }) 
                // dispatch(addCity(res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily,res.response.data.current.weather[0].icon,res.response.data.current.weather[0].main))
                    // const currentWeather = [res.i.data.city,res.i.data.country, res.response.data.current.temp, res.response.data.daily, res.response.data.current.weather[0].icon,res.response.data.current.weather[0].main]
                    // setTempDisplaying(currentWeather)
                    // setCurrentLocation(true)
            })
  }

  function showError(error) {
    //if we have an error then show a specific location, in this case Leiria
    getWeather("Leiria").then(function(res){
        getWeeklyWeather(res.data.coord.lat, res.data.coord.lon).then(function(res2){
            setxGeeks({res, res2})
            dispatch(addCity(res.data.name,res.data.sys.country, res2.current.temp, res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main))
            const currentWeather = [res.data.name,res.data.country, res2.current.temp,res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main ]
            setTempDisplaying(currentWeather)
        })
    }) 
  }




    return (
        <div>
            <ReactNotification />

            <div className="mainWrapper">
                <div style={{height:"100vh", overflowY:"scroll"}}>
                    {console.log("temp", tempDisplaying)}
                    {tempDisplaying ? 
                    // console.log("how?????", tempDisplaying)
                        <MainWeatherDisplay tempDisplaying={tempDisplaying} /> 
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

            <div style={{height:"calc(100vh - 4em)",backgroundColor:"aliceBlue", padding:"2em 1em"}}>
                <div style={{height:"65vh",}}>
                    <div style={{marginBottom:"2em"}}>
                        <Input type="text" placeholder="search for city"  onChange={ (e) => setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
                        <div style={{backgroundColor:"white", display:"inline-block"}} onClick={() =>  getCity(cities, search, store, notification, setTempDisplaying, dispatch, addCity)}>
                            <SearchSvg />
                        </div>
                    </div>

            <div style={{height:"70%", overflowY:"scroll"}}>
                        {cities["1"] ?
                        // console.log("looooooooog", cities, cities.reverse())
                        Object.keys(cities).map((key, idx) =>
                        //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
                        idx === 0 ? '' :
                        cities[key].city === "Leiria" ? '' :
                            <CityLi cities={cities} k={key} dispatch={dispatch} deleteCity={deleteCity} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                        ) 
                        : null
                        }
                </div>
                </div>
                
                
                    <div>
                       <p>XGeeks</p>
                        {cities[1] ? xGeeks ?
                                <CityLi cities={cities} k={xGeeks.id - 1} dispatch={dispatch} deleteCity={false} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                            :null
                        :null
                        }
                    </div>

                    <div>
                        <p>current location weather</p>
                        {cities[0] ? 
                                <CityLi cities={cities} k={0} dispatch={dispatch} deleteCity={false} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                        : "null"}
                    </div>


                    </div>
                </div>
        </div>
       
    )
}

export default WeatherPage;