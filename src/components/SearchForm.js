import { Input } from "../styledComponents/styles"
import { SearchSvg } from "./SVG/searchSvg"
import {useState} from 'react'
import axios from "axios"
import {getCoordsByName} from '../location/location'
import  {useDispatch} from 'react-redux'
// import {addCity} from '../actions'

const key = process.env.REACT_APP_API_KEY



export const SearchForm = (store, notification) => {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if(search.length > 0){

                getCoordsByName(search, dispatch)
                // getCity(cities, search, store, notification, setTempDisplaying, dispatch, addCity)
                // setActiveIndex()
            }else{
                store.addNotification(notification("Info","Type a city before searching","warning"))
            }
        }
    }




    return   <div style={{marginBottom:"2em"}}>

                <Input type="text" placeholder="search for city"  onChange={ e => setSearch(e.target.value)} onKeyDown={e => handleKeyDown(e)}/>
                {/* <Input type="text" placeholder="search for city"/> */}
                {/* <div className="search" onClick={() =>  getCity(cities, search, store, notification, setTempDisplaying, dispatch, addCity)}> */}
                <div className="search">
                    <SearchSvg />
                </div>
            </div>
}