import { DaysDisplay } from "./daysDisplay"

export const SevenDayForecast = ({tempDisplaying}) =>{
    return  <center>
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))", gap:"1em", width:"90%"}}>
   {     console.log("fffff", tempDisplaying)}
    {Object.keys(tempDisplaying[0].nextDays).map((key, idx) =>
            //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
            idx === 0 ? '' :
            <DaysDisplay item={tempDisplaying[0].nextDays} k={key}/>
            ) }
    </div>
</center>
}