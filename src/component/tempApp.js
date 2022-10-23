import React, {useEffect, useState} from 'react'
import './css/style.css';

export default function TempApp(){
    const [city, setCity] = useState("");       
    const [result, setResult] = useState("");

    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [status, setStatus] = useState(null);

    useEffect(()=>{
        const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } 
        else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            }, () => {
            setStatus('Unable to retrieve your location');
            });
        }
        }
        getLocation();
    }, [,])

    useEffect(()=>{
        const fetchLocationBasedApi = async () =>{
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=5f6ec90bdaeeb97f5678e731de2c58ec`
            const response = await fetch(url);
            const resJson = await response.json();
            setResult(resJson.main);
            setCity(resJson.name);
            console.log(resJson);
            
        }
        fetchLocationBasedApi();
    }, [lat, lng])

    useEffect(()=>{
        const fetchCityBasedApi = async () =>{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5f6ec90bdaeeb97f5678e731de2c58ec`
            const response = await fetch(url);
            const resJson = await response.json();
            setResult(resJson.main);
            console.log(resJson);
            console.log(resJson.weather[0].main);
        }
        fetchCityBasedApi();
    }, [city])
   
    const handleonChange=(event)=>{
        setCity(event.target.value);
    }

    return(
        <>
            <div className="box">
                    <div className="inputData">
                        <input type="search" 
                        className='inputField' 
                        value = {city}
                        onChange = {handleonChange}  />
                    </div>
                    
                    {!result ? (
                        <p className='errorMsg'>No Data Found</p>
                    ) : (
                        <>
                        <div className="info">
                            <h2 className="location"> <i className = 'fa-solid fa-street-view'></i>
                                {city}
                            </h2>

                        <h1 className="temp"> {result.temp}°C </h1>
                        <h3 className="tempmin_max">Min: {result.temp_min}°C | Max: {result.temp_max}°C</h3>
                        </div>
                        <div className="wave -one"></div>
                        <div className="wave -two"></div>
                        <div className="wave -three"></div>
                        </> 
                )}
            </div>
        </>
    )
}
