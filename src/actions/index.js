
let CityId = 0;

export const addCity = (city,country,temp, nextSevenDays, icon) => {
    console.log("dispatch a add_city")
    ++CityId 
    return {type: "ADD_CITY",CityId ,
    city,country,temp, nextSevenDays, icon}
}

export const deleteCity = (idx) => {
    return {type:"DELETE_CITY", idx}
}