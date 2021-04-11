import citiesReducer from './weather'
import  {combineReducers} from 'redux';

const allReducers = combineReducers({
    cities: citiesReducer
});

export default allReducers;