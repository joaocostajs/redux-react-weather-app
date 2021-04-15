import {getWeather,getWeeklyWeather} from '../fetch/fetches'



export function getLocation(setxGeeks, setTempDisplaying, dispatch, addCity, setisLocation){
 
    if (window.navigator.geolocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                setisLocation(true)
               //if location is returned then do this
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

                            //and also set Leiria
                            getWeather("Leiria").then(function(res){
                                getWeeklyWeather(res.data.coord.lat, res.data.coord.lon).then(function(res2){
                                    setxGeeks({res, res2})
                                    dispatch(addCity(res.data.name,res.data.sys.country, res2.current.temp, res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main))
                                })
                            }) 
                        })
                    }) 
                })
            },function(error){
                setisLocation(false)
                    //if we have an error then show a specific location, in this case Leiria
                    getWeather("Leiria").then(function(res){
                        getWeeklyWeather(res.data.coord.lat, res.data.coord.lon).then(function(res2){
                        setxGeeks({res, res2})
                        dispatch(addCity(res.data.name,res.data.sys.country, res2.current.temp, res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main))
                        const currentWeather = [res.data.name,res.data.country, res2.current.temp,res2.daily,res2.current.weather[0].icon, res2.current.weather[0].main ]
                        setTempDisplaying(currentWeather)
                    })
    }) 


            });
          } else { 
           alert( "Geolocation is not supported by this browser.")
          }
    }
}
