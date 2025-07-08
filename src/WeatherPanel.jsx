import './WeatherPanel.css';

function WeatherPanel({ location, weatherIcon, temperature, toCelsius, 
                        toFahrenheit, weatherCondition, humidity, wind, celsiusSelected }) {

    return(
        <div className="weather-body center">
            <div className="main-display center">
                <div className="location center">{location}</div>

                <section className="display-section center">

                    <div className="weather-icon center">
                        {/* <img src="//cdn.weatherapi.com/weather/64x64/night/389.png"></img> */}
                        <img src={weatherIcon}></img>
                    </div>

                    <div className="temperature center">
                        {temperature}
                        {/* 10 */}
                        <div className="unit-display center">
                           {celsiusSelected === true ? "°C" : "°F"} 
                        </div>
                    </div>

                </section>

                <section className="temperature-units center">
                    <div className="temperature-button unit-celsius center" onClick={toCelsius}>°C</div> 
                    <div className="divider"></div> 
                    <div className="temperature-button unit-fahrenheit center" onClick={toFahrenheit}>°F</div>
                </section>
            </div>

            <div className="weather-information center">
                <div className="weather-condition">Weather condition: {weatherCondition}</div>
                <div className="humidity">Humidity: {humidity}</div>
                <div className="wind">Wind: {wind}</div>
            </div>
        </div>
    )
};

export default WeatherPanel;