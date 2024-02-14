import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
    const cityRef = useRef(null);
    const[temp, setTemp] = useState(0);
    const[city, setCity] = useState('Mumbai');
    const apiKey = '3b123cf43c7b01dfae132443e725bdc8';
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=${apiKey}`;
    
    const getResponse = async(link) => {
        try {
            const response = await fetch(link);
            const data = await response.json();
            const kelvin = data.main.temp;
            const celcius = (kelvin - 273.15).toFixed(0);
            setTemp(celcius);
        }
        catch(err) {
            setCity('Please Type Valid City Name');
            setTemp('');
        }
    }

    const changeCityName = () => {
        var name = cityRef.current.value;
        var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        setCity(capitalized);
    }
    
    useEffect(()=> {
        getResponse(link);
    },[city])                   // Only run when city state changes

    return(
        <div>
            <div>
                <h1 className='heading'>Check Temperature</h1>
            </div>
            <div className='container'>
                <div className='input'>
                    <input className='box' type='text' ref={cityRef} name='message' placeholder='Enter City'></input>
                </div>
                <div className='button'>
                    <button className='btn' onClick= {changeCityName}>🔍</button>
                </div>  
            </div>

            <div className='output'>{city !== 'Please Type Valid City Name'? city +': '+ temp+'°C' : city }</div>
        </div>
    )
};

export default App;
