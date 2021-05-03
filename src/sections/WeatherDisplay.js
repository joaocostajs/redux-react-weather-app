import { DaysDisplay } from "../components/daysDisplay"
import { SevenDayForecast } from "../components/SevenDayForecast";
import { TodayForecast } from "../components/TodayForecast"

const WeatherDisplay = ({tempDisplaying, cities}) => {
    return   <div style={{height:"100vh", overflowY:"scroll"}}>
    {/* {tempDisplaying !== null ?
   
    <div>
          {console.log("temp", tempDisplaying)}
            <TodayForecast tempDisplaying={tempDisplaying}  />
            <SevenDayForecast tempDisplaying={tempDisplaying} />
    </div>
    : null } */}
    {cities.length > 0 ?
   
   <div>
         {console.log("temp", cities)}
           <TodayForecast tempDisplaying={cities}  />
           <SevenDayForecast tempDisplaying={cities} />
   </div>
   : null }
</div>
}

export default WeatherDisplay;