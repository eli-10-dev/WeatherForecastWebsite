import { useEffect, useState, useRef } from 'react';
import './App.css';
import SearchBar from './SearchBar.jsx';
import WeatherPanel from './WeatherPanel.jsx';

function App() {
    // Weather API documentation = https://www.weatherapi.com/docs/
    // Base url = http://api.weatherapi.com/v1/
    // https://www.weatherapi.com/api-explorer.aspx#current
    // See request parameters here: https://www.weatherapi.com/docs/#intro-request

    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [tempC, setTempC] = useState(null);
    const [tempF, setTempF] = useState(null);
    const [celsiusSelected, setCelsiusSelected] = useState(true);
    const [weatherCondition, setWeatherCondition] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [wind, setWind] = useState(null);
    const [queryReady, setQueryReady] = useState(false);
    
    // My idea is to set the dependency of this useEffect to a search Button interaction (for limited API call)
    // Automatic updating of the query based on the content of my search bar will result to too many renders/calls to the API
    // I also haven't thought of another dependency without the button

    // The parameter for the location is "q"
    // This part of the api request: "q=Manila"
    // I will try to replace that part of the code the the searchQuery variable
    const callUpdateIsReady = () => {
        setQueryReady(e => !e);
    }

    const toFahrenheit = () => {
        setCelsiusSelected(false);
    }

    const toCelsius = () => {
        setCelsiusSelected(true);
    }

    useEffect(() => {
        setSearchQuery("");
        setLocation(null);
        setTempC(null);
        setTempF(null);
        setTemperature(null);
        setWeatherCondition(null);
        setWeatherIcon(null);
        setHumidity(null);
        setWind(null);
        setQueryReady(false);
        setCelsiusSelected(true); 
    }, []);

    useEffect(() => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=38712c824c1449b0829104003250707&q=${searchQuery}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            setLocation(data.location.name);
            setTempC(data.current.temp_c);
            setTempF(data.current.temp_f);
            setTemperature(data.current.temp_c);  
            setWeatherCondition(data.current.condition.text);
            setWeatherIcon(data.current.condition.icon);
            setHumidity(data.current.humidity);
            setWind(data.current.wind_mph);
    
            // console.log(JSON.stringify(data, null, 2));
            // console.log(`temp_c: ${temp_c}`);
            // console.log(`temp_f: ${temp_f}`);
        })
        .catch(error => console.log("Error:", error));
    }, [queryReady]);


    useEffect(() => {
        if (celsiusSelected === true){
            setTemperature(tempC);
        } else {
            setTemperature(tempF);
        }
    }, [celsiusSelected]);

    return (
        <div className="body center">
            <div className="weather-container center">
                <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                queryReady={queryReady}
                setQueryReady={setQueryReady}
                callUpdateIsReady={callUpdateIsReady}
                />
                <WeatherPanel 
                location={location}
                weatherIcon={weatherIcon}
                temperature={temperature}
                celsiusSelected={celsiusSelected}
                toCelsius={toCelsius}
                toFahrenheit={toFahrenheit}
                weatherCondition={weatherCondition}
                humidity={humidity}
                wind={wind}
                />
            </div>
        </div>
    )
}

export default App;