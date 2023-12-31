import React, { useState } from "react";

const MainContainer = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [weatherImgs, setWeatherImgs] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const searchWeather = async (data) => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      console.log(data);

      if (response.status === 404) {
        setError("City Not Found");
        setWeatherData(null);
        setWeatherImgs(null);
      } else {
        const data = await response.json();
        setWeatherData(data);
        setError(null);

        setWeatherImgs(() => {
          // data.weather?.length>0 is equal to data.weather && data.weather.length > 0
          if (data.weather && data.weather.length > 0) {
            const weatherMain = data.weather[0].main;

            // TODO: use swith case
            if (weatherMain === "Clouds") {
              return "/images/clouds.png";
            } else if (weatherMain === "Clear") {
              return "/images/clear.png";
            } else if (weatherMain === "Rain") {
              return "/images/rain.png";
            } else if (weatherMain === "Drizzle") {
              return "/images/drizzle.png";
            } else if (weatherMain === "Mist") {
              return "/images/mist.png";
            } else {
              return null;
            }
          } else {
            return "/images/weatherIcon.png";
          }
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
      setWeatherData(null);
      setWeatherImgs(null);
    }
  };

  return (
    <div className="card">
      <div className="w-full flex flex-col space-y-5 sm:space-y-0 sm:flex-row items-center text-center sm:justify-center">
        {/* TODO: never write something you don't understand */}
        <input
          type="text"
          placeholder="enter city name"
          spellCheck="false"
          className="border-none outline-none text-[#555] px-6 h-[60px] rounded-full w-full sm:flex-1 sm:mr-4 text-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={() => searchWeather()}
          className="border-none outline-none bg-white rounded-full w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] cursor-pointer flex justify-center items-center hover:opacity-95 hover:scale-95 border-[0.5px] border-gray-500 transition duration-300"
        >
      {/* TODO: use Heroicons for all icons */}
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
              className="w-[160px] mt-4 rounded-full"
            />
          </div>
        {/*TODO: no need for h-[80px] */}
          <h1 className="text-[80px] font-medium">
            {weatherData.main && weatherData.main.temp
              ? Math.round(weatherData.main.temp)
              : ""}
          </h1>
          {/*  TODO: no need for negative margin  */}
          <h2 className="text-4xl font-normal -mt-2.5">
            {weatherData.name || ""}
          </h2>
          <div className="flex items-center justify-between px-5 py-0 mt-[50px]">
            <div className="flex items-center text-left">
              <img
                src="/images/humidity.png"
                alt="humidity icon"
                className="w-10 mr-2.5"
              />
              <div>
                <p className="text-[28px] -mt-1.5">
                  {weatherData.main && weatherData.main.humidity
                    ? `${weatherData.main.humidity}%`
                    : ""}
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
                  {weatherData.wind && weatherData.wind.speed
                    ? `${weatherData.wind.speed} Km/h`
                    : ""}
                </p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
      // No need to check for error
      // TODO: re compose this component! Logic no making sense
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
