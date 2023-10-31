import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { API } from '../../service/api.js'

import '../styles/sidenav.css'
import { DataContext } from '../../context/dataProvider'

export default function Sidenav(props) {
    const navigate = useNavigate();

    // const token = sessionStorage.getItem('refreshToken').split(" ")[1]
    // var token_obj=JSON.stringify(token)

    // to be insert
    const logout = async () => {
        // uncomment to delete the refresh token from the database
        // try {
        //     let response = await API.userLogout(token)
        //     if (response.isSuccess) {
        sessionStorage.clear()
        navigate('/')
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const { account } = useContext(DataContext)

    window.onscroll = function () { myFunction() };
    function myFunction() {
        if (props.mode === 'nt') {
            document.querySelector(".navbar").style.background = "#0c4f36";
        } else {
            if (document.documentElement.scrollTop > 600) {
                document.querySelector(".navbar").style.background = "#0c4f36";
            }
            else {
                document.querySelector(".navbar").style.background = "transparent";
            }
        }
    }

    let k = 0;
    const toggleNav = () => {
        let snav = document.getElementById('sidenav')
        if (k === 0) {
            snav.style.transform = 'translateX(0)'
            k = 1
            snav.classList.add('bg')
        }
        else {
            snav.style.transform = 'translateX(-280px)'
            k = 0
        }
    }

    return (
        <>
            <nav id='sidenav' className="sidebar">
                <div className="nvg">
                    <a href="/" className="logo">FingerTip</a>
                    <span className="fa-solid fa-xmark" style={{ color: 'white', fontWeight: '700', cursor: 'pointer', transform: 'scale(1.5)' }} onClick={() => toggleNav()}></span>
                </div>
                <div className="menu-content">
                    <ul className="menu-items">
                        <Link to='/' className="submenu-item" onClick={() => toggleNav()}>Home</Link>
                        <Link to='/allpost' className="item submenu-item" onClick={() => toggleNav()}>All Posts</Link>
                        <li className="item">
                            <Link to='/create' className="submenu-item" onClick={() => toggleNav()}>
                                Create Post
                            </Link>
                        </li>
                        {/* <li className="item">
                            <a href="/">About</a>
                        </li> */}
                        {
                            account.username ?
                                <li className="items">
                                    <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '1rem' }}></i>
                                    <a href='/'><span onClick={() => logout()}>Logout</span></a>
                                </li>
                                :
                                <li className="items">
                                    <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '1rem' }}></i>
                                    <Link to={'/login'} onClick={() => logout()}>Login</Link>
                                </li>
                        }

                    </ul>
                </div>
            </nav>
            <nav className="navbar" >
                <div className="navt">
                    <i className="fa-solid fa-bars" id="sidebar-close" style={{ color: '#fff', position: 'absolute', cursor: 'pointer' }} onClick={() => toggleNav()}></i>
                    <h2 className='title' style={{ margin: 'auto', fontWeight: '800' }}>FingerTip</h2>
                    {
                        account.username ? <div className='create-btn' style={{ margin: '0' }}>
                            <i className="fa-solid fa-circle-user" style={{ transform: 'scale(1.5) translateX(-20px) translateY(3px)', position: 'absolute' }}></i> {account.username}
                        </div>
                            :
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <div className='allpost create-btn' style={{ margin: '0' }}>
                                    Login <i className="fa-solid fa-plus"></i>
                                </div>
                            </Link>
                    }
                </div>
            </nav>
        </>
    )
}
