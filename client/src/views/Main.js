import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TopMovies from '../components/TopMovies'
import BootstrapCarousel from '../components/BootstrapCarousel'


const Main = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({})
    const history = useHistory();
    
    useEffect(()=> {
        axios.get('http://localhost:8000/api/users/loggedinuser', {withCredentials:true})
            .then(res => {
                console.log(res)
                if(res.data.results){
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err => {
                console.log(err)
                history.push('/');
            })
    },[])

    return (
    <div className="pageContainer">
        <div className="topTier">
        <h2 className="welcome m-0"><em>Welcome! {loggedInUser.name}</em></h2>
        <p >Looking for movie recommendations? <Link to="/survey">Click here</Link></p>
        </div>
        <div className="bottomTier">
            <div className="left">
                <BootstrapCarousel/>
            </div>
        <div className="right">
            <h2 className="topHeader" >Movies in Theaters:</h2>
            <TopMovies/>
        </div>
        </div>
    </div>
    );
};

export default Main;
