export const DaysDisplay = ({item, k}) => {
    return  <div style={{border:"1px solid black", borderRadius:"2em"}}>
                <center>
                <p>{String(new Date(item[k].dt * 1000)).split(" ")[0]}</p>
                </center>
                <p>Max: <span style={{fontWeight:"900"}}>{Math.round(Number(item[k].temp.max))}</span></p>
                <p>Min: {item[k].temp.min}</p>
                <center>
                <p>{item[k].weather[0].main}</p>
                </center>
            </div>
}