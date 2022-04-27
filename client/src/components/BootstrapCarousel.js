import React from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import {useEffect, useState} from "react"

export default function BootstrapCarousel() {
    // const {title, imagePath} = props;
    // const [RandomMovieList, setRandomMovieList] = useState([])

    
    // useEffect(()=> {
    //     let list =[]
    //     for(let i = 1; i<=3; i++){
    //         const RandomPage = Math.floor(Math.random()* (501 - 1) + 1)
    //         const RandomMovie = Math.floor(Math.random()*20)
    //         axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=af5ff8bffc4eea4a393e2b9649bc8e5e&language=en-US&include_adult=true&page=${RandomPage}`)
    //             .then(res => {
    //                 list.push(res.data.results[RandomMovie])
    //                 setRandomMovieList([
    //                     ...list
    //                 ])
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //         }
    //     })


        //I know this aint it yet talking with mike and mikalan rn

return (
    <Carousel>
        {/* {
            RandomMovieList.map((item,i) =>{
                return <div className="d-flex" key={i}>
                            <Carousel.Item>
                                <img className="d-block " 
                                style={{height: 240 , borderRadius: 15}} 
                                src={`https://image.tmdb.org/t/p/w500/${item.imagePath}`}
                                alt="First Movie"/>
                                <Carousel.Caption>
                                <h3>Movie #{i +1}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </div> 
                })
        } */}
        <Carousel.Item>
            <img className="d-block" 
            style={{height: 240 , borderRadius: 15}} 
            src={`https://th.bing.com/th/id/OIP.GVqCwqfUmy_azCattQL1RAHaD5?w=296&h=180&c=7&r=0&o=5&pid=1.7`}
            alt="Marvel: Avengers"/>
            <Carousel.Caption>
                <h3>Marvel: Avengers</h3>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block" 
            style={{height: 240 , borderRadius: 15}} 
            src={`https://th.bing.com/th/id/OIP.6OcSntMhK6e7ssYRTSRZDQHaF7?w=204&h=180&c=7&r=0&o=5&pid=1.7`}
            alt="Miracle"/>
            <Carousel.Caption>
                <h3>Miracle</h3>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img className="d-block" 
            style={{height: 240 , borderRadius: 15}} 
            src={`https://th.bing.com/th/id/OIP.ZzTqQqklhn3o2huZS_Fh0AHaEK?w=327&h=184&c=7&r=0&o=5&pid=1.7`}
            alt="Shawshank Redemption"/>
            <Carousel.Caption>
                <h3>Shawshank Redemption</h3>
            </Carousel.Caption>
        </Carousel.Item>

    </Carousel>
    )
}
