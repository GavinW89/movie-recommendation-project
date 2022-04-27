import axios from 'axios';
import React, {useState} from 'react';
import { useHistory, Link} from 'react-router-dom';
export default props => {
    const history = useHistory();
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', form, {withCredentials:true})
            .then(res =>{
                console.log(res)
                if(res.data.errors){
                    setError(res.data.errors)
                }else{
                    history.push('/main')//switched to login since the loggedinuser info that pops up on main.js changes properly when logging in, but not when registration pushes to main.. the previous loggedinuser info still shows up.
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const ContainerStyle = {
        height: '650px',
        width: '700px',
        padding: '40px',
        marginTop: '60px',
        marginLeft: '40px',
        backgroundColor: 'white',
        borderRadius: '15px'
    }

    return(
        <div  onSubmit={onSubmitHandler}>
            <div className='container border border-light shadow-lg align-middle mx-auto' style={ContainerStyle}>
            <h1><u>REGISTER</u></h1>
            <p> Already got an account? <Link to="/login" > Sign in </Link></p>
            <form>
                <div className='form-group mt-3 '>
                    <label className='font-weight-bold h4'>Name:</label>
                    <div className='input-group input-group-lg'>
                        <input type="text" className='form-control border border-dark mt-2 mx-auto w-75 ' placeholder='Enter Name' name='name' onChange={onChangeHandler}/>
                    </div>
                    <p className="text-danger"> {error.name?error.name.message: ""}</p>
                </div>
                <div className='form-group mt-3'>
                    <label className='font-weight-bold h4'>Email:</label>
                    <div className='input-group input-group-lg'>
                    <input type="email" className='form-control border border-dark mt-2 mx-auto w-75' placeholder='name@example.com' name='email' onChange={onChangeHandler}/>
                    </div>
                </div>
                <p className="text-danger"> {error.email?error.email.message: ""}</p>
                <div className='form-group mt-3'>
                    <label className='font-weight-bold h4'>Password:</label>
                    <div className='input-group input-group-lg'>
                    <input type="password" className='form-control border border-dark mt-2 mx-auto w-75' placeholder='Enter Password' name='password' onChange={onChangeHandler}/>
                    </div>
                </div>
                <p className="text-danger"> {error.password?error.password.message: ""}</p>
                <p className="text-danger"> {error.confirm?error.confirm.message: ""}</p>
                <div className='form-group mt-3'>
                    <label className='font-weight-bold h4'>Confirm Password:</label>
                    <div className='input-group input-group-lg'>
                    <input type="password" className='form-control border border-dark mt-2 mb-4 mx-auto w-75' name="confirm" placeholder='Confirm Password' onChange={onChangeHandler}/>
                    </div>
                </div>
                <div>
                    <input type='submit' className='btn btn-primary btn-lg' value='Sign Up'/>
                </div>
            </form>
            </div>

        </div>
    )
}
// dont call me ... dont come by my house