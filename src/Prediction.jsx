import './Prediction.css'
import sunny from './imgs/sunny.png';
import search from './imgs/search.jpg';
import air from './imgs/wind.jpg';
import hum from './imgs/humidity.jpg';
import { useState } from 'react';


export const Weatherdetails = ({icon,temp,city,country,long,lat,humidity,wind}) =>{
   return(
   <>
   <img src={icon}className='weatherimg' />
   <h3 className='temperature'>{temp} °c</h3>
   <h2 className='city'>{city}</h2>
   <h4>{country}</h4>
   <div className="gps">
      <div className="long">
         <h4>longitude</h4>
         <h4>{long}</h4>
      </div>
      <div className="lat">
         <h4>latitude</h4>
         <h4>{lat}</h4>
      </div>
   </div>
   <div className="lower">
     <div className='hum'>
        <img src={hum} />
        <h5>{humidity}</h5>
        <h5>Humidity</h5>
     </div>
     <div className="wind">
         <img src={air}/>
         <h5>{wind}</h5>
         <h5>Wind speed</h5>
     </div>
   </div>
   <div className='footer'>Desined by <a href="#">Balaraman-dev</a></div>
  </>
   )
}

const Prediction = () => {
   let api_key="abc973c65e16c1c59e390af03dfbb574";

   const [icon ,seticon]=useState(sunny);
   const [temp,settemp]=useState(0);
   const [city,setcity]=useState("salem");
   const [country,setcountry]=useState("IN");
   const [long,setlong]=useState(0);
   const [lat,setlat]=useState(0);
   const [humidity,sethumidity]=useState(0);
   const [wind,setwind]=useState(0);
   const [loading,setloading]=useState(false);
   const [citynotfound,setcitynotfound]=useState(false);
   
   const Search = async () =>{
         setloading(true);
         let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=Metric`;
         
         try{
               let res=await fetch(url);
               let data=await res.json();

               if(data.cod==="404"){
                  console.error("Entered city is wrong brooo");
                  setcitynotfound(true);
                  setloading(false);
                  return;
               }
            settemp(data.main.temp);
            setlong(data.coord.lon);
            setlat(data.coord.lat);
            setcountry(data.sys.country);
            sethumidity(data.main.humidity);
            setwind(data.wind.speed);

           }
           catch(e){
            console.error("The error is occured");
           }
           finally{
            setloading(false);
           }
      };
   const handlecity = (e) =>{
      setcity(e.target.value);
   };
   const handleenter = (e) =>{
      if(e.key==="Enter"){
         Search();
      }
   };
  return (
    <div className='content'>
      <div className="search">
        <input placeholder='Enter city broo' className='searchbox' type="text" onChange={handlecity} onKeyDown={handleenter}/>
        <img className='searchimg' src={search} onClick={()=>Search()}/>
      </div>
         <Weatherdetails icon={icon} temp={temp} city={city} country={country} long={long} lat={lat} humidity={humidity} wind={wind}/>
   </div>
  )
}

export default Prediction
