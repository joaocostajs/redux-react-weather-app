import weatherReducer from './weather'
import  {combineReducers} from 'redux';

const allReducers = combineReducers({
    weather: weatherReducer
});

export default allReducers;