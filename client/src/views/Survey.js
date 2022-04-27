import React, { useEffect, useState } from "react";
import {useHistory, Link} from "react-router-dom";
import axios from 'axios';
import GenreList from "../components/GenreList";

const Survey = (props) => {
        const [form,setForm] = useState({
            genre: "28",
            subgenre: []
        })
        const genreList = GenreList
        const history = useHistory();
        const onChangeHandler = (event) => {
            if(event.target.name === "genre"){
                setForm({
                    genre: event.target.value,
                })
                for(let i=0; i<genreList.length; i++){
                    if(genreList[i].id === form.genre){
                        setForm({
                            ...form,
                            subgenre: [genreList.splice(i,0)]
                        })
                        console.log(genreList[i].id)
                    }
                }
            }
            // else{
            //     const newArr = GenreList.splice(form.genreKey,1) // genre was still apiGenre which terminal said wasnt defined 
            //     setForm({subgenre: newArr})
            // }
            // console.log(form.genreKey  + "HERES THE KEY +++++++++++++++++++++")
            // setForm({
            //     ...form,
            //     [event.target.name]: event.target.value
            // })
        }
        console.log(form.subgenre)
    // }
    
        const onSubmitHandler = (event) => {
            event.preventDefault();
            history.push(`/catchvibes/${form.genre}`)
        }

    
        return(
            <div className="survey d-flex justify-content-center">
            <div className="survHeader">
                <Link to="/">Back to Dashboard</Link>
                <h2>What genre are you in the mood for today?</h2>
                    
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group my-3">
                            <select name="genre" onChange={onChangeHandler} > //key goes in "()"
                                {
                                    GenreList.map((item, i) => {
                                        return <option key={i} value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>


                        <input type="submit" className="btnC btn-success btn-lg my-3" value="Catch a Vibe"/>
                    </form>
            </div>
        </div>
    )
}

export default Survey;