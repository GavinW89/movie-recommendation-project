import axios from 'axios'
import React,{useEffect, useState} from 'react'

export default props => {
    const {title, description, imagePath, rating, id} = props;
    const [imdbId, setImdbId] = useState();
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=af5ff8bffc4eea4a393e2b9649bc8e5e&language=en-US`)
            .then(res =>{
                console.log(res)
                setImdbId(res.data.imdb_id)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    const MovieBox = {
        height: '400px',
        width: '1000px',
        backgroundColor: 'white',
        borderWidth: '3px',
        borderStyle: 'solid',
        borderRadius: '10px',
    }
    const styleRating = {
        color: '#f5c71a',
        fontSize: '40px'
    }

    return(
        <div>
            <div className=' shadow mx-auto mt-5 p-3' style={MovieBox}>
                <div className='row'>
                    <div className='col'>
                        <img className="pic" src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt="Movie Poster" />
                    </div>
                    <div className='col-7'>
                        <div className='row'>
                            <div className='col'>
                                    <h2>{title}</h2>
                            </div>
                            <div className='col'>
                                <h4 style={styleRating}>{rating} <span>✯</span></h4>
                            </div>
                        </div>
                        <p className="description" >{description}</p>
                        <a href={`http://imdb.com/title/${imdbId}`} target="_blank"><img src="https://cdn.freebiesupply.com/images/large/2x/imdb-logo-transparent.png" class="imdb"/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}