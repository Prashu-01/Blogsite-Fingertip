import React, { useState, useEffect, useContext } from 'react'
import '../styles/login.css'
import { API } from '../../service/api.js'
import { DataContext } from '../../context/dataProvider.jsx'
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

// login
const loginInit = {
    username: '',
    password: ''
}
const signupInit = {
    name: '',
    username: '',
    password: ''
}

export default function Login({ isUserAuthenticated }) {

    const [account, toggleAccount] = useState('login')
    const [login, setLogin] = useState(loginInit)
    const [signup, setSignup] = useState(signupInit)
    const [error, showError] = useState('')
    const { setAccount } = useContext(DataContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        showError(false);
    }, [login])

    const togglesignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup')
    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    // loginuser
    const loginUser = async () => {
        setLoading(true)
        if (login.username === '' || login.password === '') {
            showError('Enter required fields')
            setLoading(false)
        }
        else {
            try {
                let response = await API.userLogin(login)
                if (response.isSuccess) {
                    showError('successful');
                    sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                    sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                    setAccount({ name: response.data.name, username: response.data.username });

                    isUserAuthenticated(true)
                    setLogin(loginInit)
                    setLoading(false)
                    navigate('/')
                }
            }
            catch (error) {
                showError(error)
                setLoading(false)
                return;
            }
        }
    }
    // signup
    const singupUser = async () => {
        setLoading(true)
        if (signup.name === '' || signup.username === '' || signup.password === '') {
            showError('Enter required fields')
            setLoading(false)
        }
        else {
            try {
                let response = await API.userSignup(signup)
                if (response.isSuccess) {
                    showError('successfull')
                    setSignup(signupInit)
                    setLoading(false)
                    toggleAccount('login')
                }
            } catch (error) {
                showError(error)
                setLoading(false)
            }
        }
        document.querySelector('.uname').value = ""
    }

    return (
        <>
            <div className="bg">
                <div className="cont">
                    {
                        account === 'login' ?
                            <div className='login'>
                                {/* <div><i className="fa-sharp fa-solid fa-xmark"></i></div> */}
                                <span className='tl'>Login Here</span>
                                <input required={true} type="text" className="uname" name='username' placeholder='   username' onChange={(e) => onValueChange(e)} />
                                <input required={true} type="password" className="uname" name='password' placeholder='   password' onChange={(e) => onValueChange(e)} />
                                <button className="signin uname" onClick={() => loginUser()}>{
                                    (loading === true) ? <BeatLoader
                                        loading={loading}
                                        color='#16533d'
                                        size={10}
                                        loader='BounceLoader'
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    /> : 'Login'
                                }</button>
                                <span style={{ color: 'red', fontWeight: 500 }}>{error}</span>
                                OR
                                <button className="createnew uname" onClick={() => togglesignup()}>Create Account</button>
                            </div>
                            :
                            <div className='create-acount login'>
                                <span className='tl'>Create New Account</span>
                                <input required={true} type="text" className="uname val" name='name' placeholder='   name' onChange={(e) => onInputChange(e)} />
                                <input required={true} type="text" className="uname val" name='username' placeholder='   username' onChange={(e) => onInputChange(e)} />
                                <input required={true} type="password" className="uname val" name='password' placeholder='   password' onChange={(e) => onInputChange(e)} />
                                <button className="createnew uname signin" onClick={() => singupUser()} >{
                                    (loading === true) ? <BeatLoader
                                        loading={loading}
                                        color='#16533d'
                                        size={10}
                                        loader='BounceLoader'
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    /> : 'Create Account'
                                }</button>
                                {/* <input type="submit" value='submit' /> */}
                                <div style={{ color: 'red', fontWeight: 500 }}>{error}</div>
                                OR <br />
                                <span style={{ color: '#dbffdb' }}>Already have account? <span style={{ color: '#c1ffde', cursor: 'pointer' }} onClick={() => togglesignup()}>Login</span></span>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
