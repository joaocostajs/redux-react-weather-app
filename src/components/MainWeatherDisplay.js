const MainWeatherDisplay = ({tempDisplaying}) => {
   return  <div style={{height:"50vh",display:"grid", alignItems:"center",marginLeft:"4em" }}>   
                <div>
                <h1 style={{fontSize:"5em", display:"inline-block", marginRight:".5em"}}>{tempDisplaying[2]} º</h1>
                <div style={{display:"inline-block"}}>
                    <h1 style={{display:"inline-block"}}>{tempDisplaying[0]}</h1>
                    <p>{tempDisplaying[1]}</p>
                </div>
                <p style={{display:"inline-block", marginLeft:"2em"}}>{tempDisplaying[5]}  <img style={{position:"relative", top:"1em"}} src={"http://openweathermap.org/img/w/" +  tempDisplaying[4] + ".png"} alt=""/>   </p>
                </div>
             </div>
}