import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import MovieBox from "../components/MovieBox";

const CatchVibes = (props) => {
    const [loaded, setLoaded] = useState(false)
    const {genre} = useParams();
    const [RandomMovieList, setRandomMovieList] = useState([])

    
    useEffect(()=> {
        let list =[]
        for(let i = 1; i<=5; i++){
            const RandomPage = Math.floor(Math.random()* (501 - 1) + 1)
            const RandomMovie = Math.floor(Math.random()*20)
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=af5ff8bffc4eea4a393e2b9649bc8e5e&language=en-US&include_adult=true&page=${RandomPage}&with_genres=${genre}`)
                .then(res => {
                    list.push(res.data.results[RandomMovie])
                    setRandomMovieList([
                        ...list
                    ])
                })
                .catch(err => {
                    console.log(err)
                })
            }
            // setRandomMovieList(list)

            console.log('HERES YOUR RANDOM MOVIE LIST')
            console.log(RandomMovieList)
            setLoaded(true)
            console.log(loaded)
        },[])

    return (
    <div className="pageContainer">
        <div className="d-flex">
        <Link className="btn btn-success" to="/survey">Pick a Different Genre</Link>
        <Link className="btn btn-success mx-3" to="/main">Back to Dashboard</Link>
        </div>
        {
            loaded &&
            RandomMovieList.map((item,i) =>{
                return <MovieBox key={i} title={item.title} description={item.overview} imagePath={item.poster_path} rating={item.vote_average} id={item.id}/>
            })
        }
    </div>
    );
};

export default CatchVibes;
