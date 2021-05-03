const CitiesList = (cities) => {
    return   <div style={{height:"70%", overflowY:"scroll"}}>

                { Object.keys(cities).reverse().map((key, idx) =>
                  //if idx is zero it means its today and we dont want it soo we dont return anything when is zero
                     idx === cities.length - 1 ? '' :
                     cities[key].city === "Leiria" ? '' :
                     <p>City</p>
                    // <CityLi cities={cities} k={key} dispatch={dispatch} deleteCity={deleteCity} setState={setActiveIndex} state={activeIndex} setTempDisplaying={setTempDisplaying}/>
                ) }
            </div>
}
   

export default CitiesList;