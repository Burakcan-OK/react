import Weather from './components/Weather'
import './App.css';
import {useState,useReducer} from 'react'
import { reducer } from './reducer';

const initialState = {
  dataSrc : ''
}

function App() {

  const [data, setData] = useState("")

  const [state, dispatch] = useReducer(reducer,  initialState)
  
  const description =data.weather[0].description.toUpperCase()

 
  const getWeather = () => {
    try {
      navigator.geolocation.getCurrentPosition(position =>{
        const {latitude, longitude} = position.coords 
      const lang = navigator.language.split('-')[0]
        const API = ''
        const url =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}&lang=${lang}&units=metric`
        fetch(url)
        .then((res) => res.json())
        .then(res => {setData(res)})
        .then(dispatch({type: description}))
        
        .catch(err => console.log(err))
      })
    } catch {
      alert ('NO DATA HAS BEEN FETCHED')
    }
  }
  
  return (
    <div className="App">
      <button onClick={getWeather} className='btn' >GET WEATHER FORECAST</button>
      
      <Weather data={data} imgSrc={state.dataSrc} />
      
    </div>
  );
}

export default App;
