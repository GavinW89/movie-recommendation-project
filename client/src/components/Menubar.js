import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import {useCookies} from 'react-cookie'
import { useHistory } from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
        main: '#1976d2',
        },
    },
    });

export default function ButtonAppBar() {
    const [cookie, setCookie, removeCookie] = useCookies(['usertoken']);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();

    const onClickHandler= (e) =>{
        if(loggedIn){
            logout();
            setLoggedIn(!loggedIn)
        }else{
            history.push('/login')
        }
    }

    const logout = () => {
            axios.get('http://localhost:8000/api/users/logout', {withCredentials:true})
                .then(res => {
                    console.log("i pwomise im working");
                    console.log(res)
                    history.push('/login')
                })
            .catch(error=>console.log(error))
    }

    useEffect(()=> {
        axios.get('http://localhost:8000/api/users/loggedinuser', {withCredentials:true})
            .then(res => {
                // console.log(res)
                setLoggedIn(!loggedIn)
                setLoaded(!loaded)
            })
            .catch(err => {
                console.log(err)
            })
            
    },[])

    return (
    <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
        <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img className="logo" src="https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/175944081_147533410641973_7512514495715658854_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=e3f864&_nc_ohc=l7eXBswCIv4AX_DzjZw&_nc_ht=scontent-lga3-2.xx&oh=00_AT9AIochrGq76vDYDk9CT-XPDvLboh8wubgwmSn6qcmwDA&oe=62670327"/>
            </Typography>
            <Typography></Typography>
            {
                loaded&&
                <Button color="inherit" onClick={onClickHandler}>{
                    loggedIn? 'Logout'
                    : 'Login'
                }</Button>
            }
        </Toolbar>
        </AppBar>
        </ThemeProvider>
    </Box>
    );
}