import "./currentWeather.css";

const CurrentWeather = ({data}) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data?.city}</p>
          <p className="weather-descripttion">{data.weather[0].description} </p>
        </div>

        <img src={`/icons/${data.weather[0].icon}.png`} alt="weather" className="weather-icon " />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}&deg;c</p>
        <div className="details">
      {/* row 1 */}
          <div className="parameter-row">
          <span className="parameter-label top">Details</span>
          </div>
      {/* row 2 */}
          <div className="parameter-row">
          <span className="parameter-label">Feel Like</span>
          <span className="parameter-value">{Math.round(data.main.feels_like)}&deg;c</span>
          </div>
      {/* row 3 */}
          <div className="parameter-row">
          <span className="parameter-label">Wind</span>
          <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
      {/* row 4 */}
          <div className="parameter-row">
          <span className="parameter-label">Humidity</span>
          <span className="parameter-value">{data.main.humidity}% </span>
          </div>
      {/* row 5 */}
          <div className="parameter-row">
          <span className="parameter-label">Pressure</span>
          <span className="parameter-value">{data.main.pressure} hpa</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
