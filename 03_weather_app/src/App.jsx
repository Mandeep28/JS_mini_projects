
import { useState } from 'react';
import './App.css'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import CurrentWeather from './components/current-weather/CurrentWeather'
import Search from './components/search/Search'
import Forcast from './components/forcast/Forcast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forcast, setForcast] = useState(null)



  const onSearchChange = (searchData) =>{
    console.log(searchData)
    const {countryCode, name, regiionCode} = searchData;
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?q=${name},${regiionCode},${ countryCode}&appid=${WEATHER_API_KEY}&units=metric`)
    const forcastFetch = fetch(`${WEATHER_API_URL}/forecast?q=${name},${regiionCode},${ countryCode}&appid=${WEATHER_API_KEY}&units=metric  `)

    Promise.all([currentWeatherFetch, forcastFetch])
    .then(async(response)=>{
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label ,  ...weatherResponse})
        setForcast({city: searchData.label ,  ...forcastResponse})
    }).catch((err) => console.log(err))


  }

console.log(currentWeather)
console.log(forcast)



  return (
    <section className='container'>
      <Search onSearchChange={onSearchChange} />
    { currentWeather &&  <CurrentWeather data={currentWeather}/>}
    {forcast &&   <Forcast data={forcast} />}
  

    </section>
  )
}

export default App
