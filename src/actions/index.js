
let CityId = 0;

export const addCity = (newCity) => {
    console.log("dispatch a add_city:", newCity)
    console.log("cityId++",CityId)
    ++CityId 
    return {type: "ADD_CITY",CityId ,
    newCity}
}

export const deleteCity = (idx) => {
    return {type:"DELETE_CITY", idx}
}