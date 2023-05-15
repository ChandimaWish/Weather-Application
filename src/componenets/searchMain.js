import React,{ useEffect,useState} from 'react'
import '../componenets/style.css';
import WeatherDetails from './WeatherDetails';


function SearchMain() {
    const[searchTerm,setSearchTerm] = useState('colombo');
    const [tempInfo,setTempInfo]=useState({});
 // useEffect
 //Async function
 //Promises
 // Try and Catch  

 const getWeatherInfo = async () =>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=f237d9781b735d5ae9d9661488266c0e`;

      let res = await fetch(url);
      let data = await res.json();

      const {temp,humidity,pressure} = data.main;
      const {main:weathertype}= data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country,sunset}=data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathertype,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
      //console.log(data);

    }
    catch(error){
      console.log(error);
    }
 };
 //
 useEffect(()=>{
   getWeatherInfo();
    
 },[]);
  return (
    <>
    <div className='wrap'>  
        <div className='search'>
            <input type='search'
             placeholder='Search City..'
              id='search' 
              value= {searchTerm} 
            onChange={(e) =>setSearchTerm(e.target.value)} />
        
        <button className='searchButton' onClick={getWeatherInfo}>
            Search
        </button>
        </div>
    </div> 
  {/* This is the weather details page*/}

    <WeatherDetails {...tempInfo}/>
    </>
  );
}

export default SearchMain
