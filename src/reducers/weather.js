

const city = {
    city:"",
    country:"",
    temp:"",
}



const weather = (state = [], action) => {
    switch (action.type){
        case 'ADD_CITY':
            console.log("action",action)
            return [
                // take the current state
                ...state,
                {
                    id: action.CityId,
                    city:action.city,
                    country:action.country,
                    temp: action.temp,
                    nextSevenDays: action.nextSevenDays
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

export default weather;