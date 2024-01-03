import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const voteFormater=(num)=>{
    return String(num).slice(0,3)
}
const ResultCart = ({movie}) => {

    const {watchlist, watched ,addMovieToWatchlist, addMovieToWatched} =useContext(GlobalContext)
    const storedMovieWatched = watched.find((i) => i.id===movie.id)
    const storedMovie = watchlist.find((i) => i.id===movie.id)
    ? true
    : storedMovieWatched
    ? true
    : false
    
  return (
    <div className='result-card'>
        <div className='poster-wrapper'>
            {movie.poster_path ?(
                <img 
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={`${movie.poster_path}`}
                />
                ):(<div className='filler-poster'></div>)
            }
        </div>
        <div className='info'>
            <div className='header'>
                <h3 className='title'>{movie.title}</h3>
                <h4 className='release-date'>Release Date:{movie.release_date ?
                (movie.release_date.substring(0,4))
                    :'No Information'}
                </h4>
                <h4 className='release-date'>
                    IMDB:<b>{movie.vote_average ? voteFormater(movie.vote_average): 'No Information' }</b>
                </h4>
            </div>
            <div className='controls'>
                <button 
                className='btn' 
                disabled={storedMovie}
                onClick={()=> addMovieToWatchlist(movie)}>
                    Add to WatchList
                </button>
                <button 
                className='btn' 
                disabled={storedMovieWatched}
                onClick={()=> addMovieToWatched(movie)}>
                    Add to Watched
                </button>
            </div>
        </div>
    </div>
  )
}

export default ResultCart