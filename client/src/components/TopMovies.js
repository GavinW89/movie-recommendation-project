import axios from 'axios'
import React,{useEffect,useState} from 'react'

export default props => {
    const [RandomMovieList, setRandomMovieList] = useState([])

    useEffect(()=>{
        let list =[]
        for(let i = 1; i<=5; i++){
            const RandomPage = Math.floor(Math.random()* (61 - 1) + 1)
            console.log("Random Page ====" + RandomPage)
            const RandomMovie = Math.floor(Math.random()*20)
            console.log("Random Movie ====" + RandomMovie)
            axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=af5ff8bffc4eea4a393e2b9649bc8e5e&language=en-US&page=${RandomPage}`)
                .then(res => {
                    list.push(res.data.results[RandomMovie])
                    setRandomMovieList([
                        ...list
                    ])
                    console.log(list)
                })
                .catch(err => {
                    console.log(err)
                })
            }
    },[])
        
    // useEffect(()=>{
    //     axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=af5ff8bffc4eea4a393e2b9649bc8e5e&language=en-US&page=1`)
    //         .then(res =>{
    //             console.log(res)
    //             setTopMovies(res.data.results.slice(0,5))
    //         })
    //         .catch(err =>{
    //             console.log(err)
    //         })
    // },[])
    return(
        <div>
            {
            RandomMovieList.map((item,i) =>{
                return <div className="d-flex" key={i}> <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="picMain my-3"/> <h3 className="top mx-3">{item.original_title}</h3> </div> 
                })
            }
        </div>
    )
}