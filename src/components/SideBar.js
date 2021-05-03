import { Input } from "../styledComponents/styles";
import CitiesList from "./CitiesList";
import { CityLi } from "./CityLi";
import { CurrentLocation } from "./CurrentLocation";
import { SearchForm } from "./SearchForm";
import { SearchSvg } from "./SVG/searchSvg";



const SideBar = (cities,setSearch,handleKeyDown, store, getCity,xGeeks,dispatch,addCity,search, notification,setActiveIndex) => {
    return  <div style={{height:"calc(100vh - 4em)",backgroundColor:"aliceBlue", padding:"2em 1em"}}>
                <div style={{height:"65vh",}}>
                    <SearchForm store={store} notification={notification} dispatch={dispatch} addCity={addCity}/>
                    <CitiesList cities={cities}/>
                </div>
                <CurrentLocation cities={cities}/>
            </div>

}

export default SideBar;