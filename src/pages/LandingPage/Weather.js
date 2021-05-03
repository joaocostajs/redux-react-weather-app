import SideBar from '../../components/SideBar';
import WeatherDisplay from '../../sections/WeatherDisplay';
import {ReactNotification, notification, store, useState, useEffect, useSelector, useDispatch, addCity, deleteCity, DaysDisplay, CityLi, SearchSvg, Input, getCity, MainWeatherDisplay, getLocation} from '../weatherImports';

function WeatherPage () {
    const cities = useSelector(state => state.cities || null)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const [tempDisplaying, setTempDisplaying] = useState(null)
    const [activeIndex, setActiveIndex] = useState()
    const [xGeeks, setxGeeks] = useState()
    const [isLocation, setisLocation] = useState(false)


    useEffect(() => {
        //when page loads get the current location and also add location for XGeeks Leiria
        getLocation(setTempDisplaying, dispatch,addCity)
        setActiveIndex(0)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //   console.log(tempDisplaying)
    // }, [tempDisplaying])

    // useEffect(() => {
    //     // wait to have leiria location and then display it otherwise dont show
    //     const leiria = cities.find(city => city.city === "Leiria")
    //     setxGeeks(leiria)
    //      // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [xGeeks])

    // const handleKeyDown = (event, search) => {
    //     if (event.key === 'Enter') {
    //         if(search.length > 0){
    //             getCity(cities, search, store, notification, setTempDisplaying, dispatch, addCity)
    //             setActiveIndex()
    //         }else{
    //             store.addNotification(notification("Info","Type a city before searching","warning"))
    //         }
    //     }
    // }

    return (
        <div>
            <ReactNotification />

         
       

            <div className="mainWrapper">

            <WeatherDisplay  cities={cities}/>

            <SideBar cities={cities} setSearch={setSearch} store={store}  getCity={getCity} dispatch={dispatch} addCity={addCity}  notification={notification} setActiveIndex={setActiveIndex}/>
{/* 
            <div style={{height:"calc(100vh - 4em)",backgroundColor:"aliceBlue", padding:"2em 1em"}}>
                <div style={{height:"65vh",}}>
                    <div style={{marginBottom:"2em"}}>
                        <Input type="text" placeholder="search for city"  onChange={ (e) => setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
                        <div className="search" onClick={() =>  getCity(cities, search, store, notification, setTempDisplaying, dispatch, addCity)}>
                            <SearchSvg />
                        </div>
                    </div>

            <div style={{height:"70%", overflowY:"scroll"}}>
                        {cities["1"] ?
                        Object.keys(cities).reverse().map((key, idx) =>
                        //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
                        idx === cities.length - 1 ? '' :
                        cities[key].city === "Leiria" ? '' :
                            <CityLi cities={cities} k={key} dispatch={dispatch} deleteCity={deleteCity} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                        ) 
                        : null
                        }
                </div>
                </div>
                
                
                    <div>
                        {!isLocation ?
                             xGeeks ? 
                                cities[0] ? 
                                    <div>
                                    <p>XGeeks</p>
                                    <CityLi cities={cities} k={xGeeks.id - 1} dispatch={dispatch} deleteCity={false} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                                    </div>
                                :null
                            :null
                        :
                              xGeeks ? 
                                cities[1] ? 
                                    <div>
                                    <p>XGeeks</p>
                                    <CityLi cities={cities} k={xGeeks.id - 1} dispatch={dispatch} deleteCity={false} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                                    </div>
                                :null
                             :null
                        }
                    </div>

                    <div>
                    {isLocation ? cities[0] ? 
                            <div>
                                <p>current location weather</p>
                                <CityLi cities={cities} k={0} dispatch={dispatch} deleteCity={false} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                            </div>
                       : null : null}
                    </div>


                    </div> */}
                </div>
        </div>
       
    )
}

export default WeatherPage;