import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
    // Ref to store reference to the city input element
    const cityRef = useRef(null);

    // State variables to store temperature and city name
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState('Mumbai');

    // API key for OpenWeatherMap
    const apiKey = '3b123cf43c7b01dfae132443e725bdc8';

    // Construct the API URL with the city name and API key
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=${apiKey}`;
    
    // Function to fetch weather data from OpenWeatherMap API
    const getResponse = async(link) => {
        try {
            const response = await fetch(link);
            const data = await response.json();
            const kelvin = data.main.temp;
            const celcius = (kelvin - 273.15).toFixed(0);
            setTemp(celcius);
        }
        catch(err) {
            // Handle error when city name is invalid
            setCity('Please Type Valid City Name');
            setTemp('');
        }
    }

    // Function to capitalize the first letter of the entered city name
    const changeCityName = () => {
        var name = cityRef.current.value;
        var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        setCity(capitalized);
    }

    // Event handler for handling Enter key press
    const keyPress = (event) => {
        if (event.key === 'Enter') {
            changeCityName(); // Call changeCityName function when Enter key is pressed
        }
    }
    
    // useEffect hook to fetch weather data whenever the city state changes
    useEffect(()=> {
        getResponse(link);
    },[city]) // Dependency array ensures the effect runs when 'city' state changes

    // JSX to render the component
    return(
        <div>
            <div>
                <h1 className='heading'>Check Temperature</h1>
            </div>
            <div className='container'>
                <div className='input'>
                    {/* Input field for entering city name */}
                    <input className='box' type='text' onKeyDown={keyPress} ref={cityRef} name='message' placeholder='Enter City'></input>
                </div>
                <div className='button'>
                    {/* Button to trigger fetching weather data */}
                    <button className='btn' onClick= {changeCityName}>🔍</button>
                </div>  
            </div>

            {/* Display weather information */}
            <div className='output'>{city !== 'Please Type Valid City Name'? city +': '+ temp+'°C' : city }</div>
        </div>
    )
};

export default App;
