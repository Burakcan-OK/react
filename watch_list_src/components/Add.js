import React, { useState } from 'react'
import ResultCart from './ResultCart'

const Add = () => {

    const [query, setQuery]=useState("")
    const [results, setResults]=useState([])
    const onChange=(e)=>{
        
        setQuery(e.target.value)
        fetch(`
        https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TBDB_key}&include_adult=true&language=en-US&page=1&query=${e.target.value}
        `)
        .then(res=>res.json())
        .then(data=>{
            if(!data.errors){
                setResults(data.results)
            } else {
                setResults([])
            }
        })
        
    }
  return (
    <div className='add-page' >
        <div className='container' >
            <div className='add-content'>
                <img src='https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/tfw5LKySp7uEYJ3CUuD4TKx3s8y.jpg' alt=''/>
                <div className='titles'>
                    <h1>Welcome</h1>
                    <h2>Discover and Enjoy Zillions of Movie and Tv Series</h2>
                </div>
                <div className='input-wrapper' >
                    <input type='text' 
                    value={query}
                    onChange={onChange}
                    placeholder='Search for movie, series or character...'/>
                </div>
                {results.length>0 &&(
                    <ul className='results'>
                        {results.map((movie)=>(
                    <li key={movie.id}>
                        <ResultCart movie={movie} />
                    </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
    </div>
  )
}

export default Add