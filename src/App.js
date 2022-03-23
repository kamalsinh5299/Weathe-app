import "./App.css";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Login from "./Login";
const citys = [
  { id: 1, name: "mumbai" },
  { id: 2, name: "rajkot" },
  { id: 3, name: "morvi" },
];
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export default function App(){
  const [search, setSearch] = useState("mumbai");
  const [loder, setLoder] = useState(false);
  const [city,setCity]=useState("")
  const [days,setDays]=useState([])
  useEffect(() => {
    const fetchapi = async () => {
      setLoder(true);
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=fd7ac8fff385acc82756f92d0a669817`
      );
      const resjson = await data.json();
      setCity(resjson);
      setLoder(false);
    }
  fetchapi();
  },[search]);
  useEffect(() => {
    const fetchapii = async () => {
      setLoder(true);
      const forecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=fd7ac8fff385acc82756f92d0a669817`
      );
      const result = await forecast.json();
      const {list,city}=result;
    setDays(list);
      setLoder(false);
    }
  fetchapii();
  },[search]);
  return(
    <div>
      {loder?<Loader/>:<>
       <div className="drop-down">
            <label>
              Select City:
              <select
                className="citys"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              >
                {citys.map((el) => {
                  return <option key={el.id}>{el.name}</option>;
                })}
              </select>
            </label>

          </div> <div className="main-container">
            {city.main && (
              <div className="city">
                <div className="date"> {new Date().toDateString("en-US")}</div>
                <h2 className="city-name">
                  <span>{city.name}</span>
                  <sup>{city.sys.country}</sup>
                </h2>
                <div className="city-temp">
                  {Math.round(city.main.temp)}
                  <sup>&deg;C</sup>
                </div>
                <div className="info">
                  <img
                    className="city-icon"
                    src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                    alt={city.weather[0].description}
                  />
                  <p>{city.weather[0].description}</p>
                </div>
              </div>
            )} {days &&(
              <div className="weather">
               
                {days.slice(0,5).map(d=>{
                  return<div key={d.cod} className="card"><div className="date">{weekday[new Date().getDay("en-US")]} </div>
                 
                  <div className="city-temp">
                    {Math.round(d.main.temp_min)}
                    {/* <sup>&deg;C</sup> */}
                  </div>
                  <div className="info">
                    <img
                      className="city-icon"
                      src={`http://openweathermap.org/img/w/${d.weather[0].icon}.png`}
                      alt={d.weather[0].description}
                    />
                    <h4>{d.dt_txt}</h4>
                  </div>
                  </div>              
                })} 
                </div>
            )}
          </div>
          
          
          
          </>}
    </div>
  );
}