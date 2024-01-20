import React from 'react'




const Weather = ({data, imgSrc}) => {

if(!data){
    return <p>Press to button above...</p>
}
  return (
    <div className='data'>
        <div className='head'>
            <h1>Current Weather</h1>
        </div>
        <div className='info'>
            <h1>{data.name}</h1>
            <h1><img src={imgSrc} alt='icon' /></h1>
            <h3>{Math.ceil(data.main.temp)}°C</h3>
            <h3>{new Date(data.dt*1000).toLocaleDateString()}</h3>
        </div>
    </div>
    
  )
}

export default Weather
