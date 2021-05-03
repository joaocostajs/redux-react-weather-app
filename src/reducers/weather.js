

const city = {
    city:"",
    country:"",
    temp:"",
}



const cities = (state = [], action) => {
    switch (action.type){
        case 'ADD_CITY':
            console.log("action",action)
        // if we already have this city on state dont add it again
            if( state.find(item => item.city === action.city)) return state
            return [
                // take the current state
                ...state,
                {
                    id: action.CityId,
                    city:action.newCity.city,
                    country:action.newCity.country,
                    temp: action.newCity.temp,
                    nextDays: action.newCity.nextDays,
                    icon: action.newCity.icon,
                    condition:action.newCity.condition
                }
              
                //overwrite the state

            ]
            case 'DELETE_CITY':
                console.log("action",action)
                console.log(state)
                console.log("filtered",state.filter(({ id }) => id !== action.idx))

                return state.filter(({ id }) => id !== action.idx);

        default: 
            return state;
    }
}

export default cities;