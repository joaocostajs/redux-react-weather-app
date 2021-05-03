export const TodayForecast = ({tempDisplaying}) => {
        return  <div style={{height:"50vh",display:"grid", alignItems:"center",marginLeft:"4em" }}>   
                    <div>
                        {console.log("today",tempDisplaying)}

                        <h1 style={{fontSize:"5em", display:"inline-block", marginRight:".5em"}}>{ Math.round(Number(tempDisplaying[0].temp )) + "º"} </h1>
                        <div style={{display:"inline-block"}}>
                            <h1 style={{display:"inline-block"}}>{tempDisplaying[0].city}</h1>
                            <p>{tempDisplaying[0].country}</p>
                        </div>
                        <p style={{display:"inline-block", marginLeft:"2em"}}>{tempDisplaying[0].condition}  <img style={{position:"relative", top:"1em"}} src={"http://openweathermap.org/img/w/" +  tempDisplaying[0].icon + ".png"} alt=""/>   </p>
                    </div>
                </div>
}