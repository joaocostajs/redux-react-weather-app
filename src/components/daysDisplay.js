export const DaysDisplay = ({item, k}) => {
    return  <div style={{boxShadow:"0 0 10px 0 rgba(0,0,0,0.2", borderRadius:"1em", padding: "1em 0"}}>
                <center>
                  
                <p>{String(new Date(item[k].dt * 1000)).split(" ")[0]}</p>
                </center>
                <p style={{display:"inline-block", marginRight:"1em"}}> <span style={{fontWeight:"900"}}>{Math.round(Number(item[k].temp.max))}</span></p>
                <p style={{display:"inline-block"}}>  {item[k].temp.min}</p>
                <center >
                    <div style={{width:"80%",display:"grid", gridTemplateColumns:"40px 1fr", alignItems:"center"}}>
                      <img style={{margin:"0", width: "40px"}} src={"http://openweathermap.org/img/w/" + item[k].weather[0].icon + ".png"} alt=""/>
                      <p style={{display:"inline-block", margin:"0"}}>{item[k].weather[0].main}</p>
                </div>
                </center>
            </div>
}