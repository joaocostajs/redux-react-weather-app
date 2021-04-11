
let CityId = 0;

export const addCity = (city,country,temp, nextSevenDays) => {
    console.log("dispatch a add_city")
    ++CityId 
    return {type: "ADD_CITY",CityId ,
    city,country,temp, nextSevenDays}
}

export const deleteCity = (idx) => {
    return {type:"DELETE_CITY", idx}
}