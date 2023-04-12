import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import Time from "./Time";

const WeatherApp = (props) => {
  const [cityName, setCityName] = useState("Delhi");
  const [weatherData, setWeatherData] = useState();
  const [submitBtn, setSubmitBtn] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=92edf68eb90c67828101db88835e458f`;
      const response = await fetch(url);
      const jsonResponse = await response.json();

      setWeatherData(jsonResponse);
    };
    fetchApi();
  }, [submitBtn]);

  function handleChange(e) {
    setCityName(e.target.value);
  }

  function handleSubmit(e) {
    setSubmitBtn(!submitBtn);
    e.preventDefault();
  }
  function handleClick() {
    setCityName("");
    clearTimeout();
  }

  let weatherStyle = "clear";
  if (
    weatherData &&
    weatherData.weather &&
    weatherData.weather[0] &&
    weatherData.weather[0].id
  ) {
    if (weatherData.weather[0].id >= 200 && weatherData.weather[0].id <= 250) {
      weatherStyle = "thunderstorm";
    } else if (
      weatherData.weather[0].id >= 300 &&
      weatherData.weather[0].id <= 350
    ) {
      weatherStyle = "drizzle";
    } else if (
      weatherData.weather[0].id >= 500 &&
      weatherData.weather[0].id <= 550
    ) {
      weatherStyle = "rain";
    } else if (
      weatherData.weather[0].id >= 600 &&
      weatherData.weather[0].id <= 650
    ) {
      weatherStyle = "snow";
    } else if (
      weatherData.weather[0].id >= 700 &&
      weatherData.weather[0].id <= 750
    ) {
      weatherStyle = "fog";
    } else if (
      weatherData.weather[0].id >= 803 &&
      weatherData.weather[0].id <= 850
    ) {
      weatherStyle = "clouds";
    }
  }

  return (
    <div className={`weather ${weatherStyle}`}>
      <Time />
      <div className="App-wrap">
        <h1 className="app-header">Live Weather App</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            spellcheck="false"
            className="searchBox"
            onChange={handleChange}
            type="text"
            placeholder="Enter City Name Here"
            value={cityName}
          />
          <button className="btn" onClick={() => setTimeout(handleClick, 10)}>
            Search
          </button>
        </form>
        {weatherData?.cod === "404" ? (
          <h1>Please Enter A Valid City Name!!</h1>
        ) : weatherData?.cod === "400" ? (
          <h1>City Name can't be EMPTY!!</h1>
        ) : (
          <div>
            <h2>
              <i className="fa-solid fa-location-dot"> </i> {weatherData?.name}{" "}
              : {weatherData?.main.temp} °C
            </h2>
            <h2 className="description">
              Description : {weatherData?.weather[0].description}{" "}
            </h2>
            <h3>
              Min : {weatherData?.main.temp_min} °C || Max :{" "}
              {weatherData?.main.temp_max} °C
            </h3>
            <h3 className="humidity">
              Humidity : {weatherData?.main.humidity} || Pressure :{" "}
              {weatherData?.main.pressure}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
