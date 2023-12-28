import React, { useState } from "react";

const MainContainer = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [weatherImgs, setWeatherImgs] = useState();

  const apiKey = "{apikey}";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const searchWeather = async (data) => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      console.log(data);

      if (response.status === 404) {
        setError("City Not Found");
        setWeatherData(null);
      } else {
        const data = await response.json();
        setWeatherData(data);
        setError(null);

        setWeatherImgs(() => {
          if (data.weather[0].main == "Clouds") {
            return "/images/clouds.png";
          } else if (data.weather[0].main == "Clear") {
            return "/images/clear.png";
          } else if (data.weather[0].main == "Rain") {
            return "/images/rain.png";
          } else if (data.weather[0].main == "Drizzle") {
            return "/images/drizzle.png";
          } else if (data.weather[0].main == "Mist") {
            return "/images/mist.png";
          }
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
      setWeatherData(null);
    }
  };

  return (
    <div className="card">
      <div className="w-full flex text-center justify-center">
        <input
          type="text"
          placeholder="enter city name"
          spellCheck="false"
          className="border-none outline-none text-[#555] px-6 h-[60px] rounded-full flex-1 mr-4 text-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={() => searchWeather()}
          className="border-none outline-none bg-white rounded-full w-[60px] h-[60px] cursor-pointer flex justify-center items-center hover:opacity-95 hover:scale-95 border-[0.5px] border-gray-500 transition duration-300"
        >
          <img src="images/search.png" alt="search icon" className="w-4" />
        </button>
      </div>
      {weatherData ? (
        // Display weather data
        <div>
          <div className="flex justify-center">
            <img
              src={weatherImgs}
              alt="weather icons"
              className="w-[160px] mt-4"
            />
          </div>
          <h1 className="text-[80px] font-medium">
            {Math.round(weatherData.main.temp)}
          </h1>
          <h2 className="text-4xl font-normal -mt-2.5">{weatherData.name}</h2>
          <div className="flex items-center justify-between px-5 py-0 mt-[50px]">
            <div className="flex items-center text-left">
              <img
                src="/images/humidity.png"
                alt="humidity icon"
                className="w-10 mr-2.5"
              />
              <div>
                <p className="text-[28px] -mt-1.5">
                  {weatherData.main.humidity}%
                </p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="flex items-center text-left">
              <img
                src="/images/wind.png"
                alt="humidity icon"
                className="w-10 mr-2.5"
              />
              <div>
                <p className="text-[28px] -mt-1.5">
                  {weatherData.wind.speed} Km/h
                </p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            error ? `h-[300px] flex justify-center items-center text-4xl` : null
          }
        >
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default MainContainer;
