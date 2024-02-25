import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Auth from './Auth'
import { Pen } from 'lucide-react';
import Popup from './Popup';
import axios from 'axios'
import styled from 'styled-components';
// import TailNav from '../pages/TailNav';


function Navbar() {
    const [showModal, setShowModal] = useState(false)
    const [navSetting, setNavSetting] = useState({
        div_value : '',
        font_color : '',
        font_type : '',
        font_size : '',
        bg_color : ''
    })
    const {getToken, logout} = Auth()
    const fLogout = () => {
        if (getToken()) {
            logout()
        }
    }

    useEffect(() => {
        let divName = 'nav_customization'
        axios.get(`http://127.0.0.1:8000/api/getCustomization/${divName}`).then(res => {
            if (res.data.code === 200) {
                let data = res.data.data
                setNavSetting({
                    div_name : 'nav_customization',
                    div_value : data.div_value,
                    font_color : data.font_color,
                    font_type : data.font_type,
                    font_size : data.font_size,
                    bg_color : data.bg_color
                })
            }
        }).catch(error => {
            if (error.response.status === 404) {
                alert('Something went wrong');
                setNavSetting({})
            } else if (error.response.data.status === false && error.response.data.code === 400) {
                setNavSetting({})
            }
        })
    }, [])

    const NAV = styled.nav`
        background-color: ${navSetting.bg_color} !important;
        color: ${navSetting.font_color} !important;
        font-family: ${navSetting.font_type} !important;
        font-size: ${navSetting.font_size}px !important;
        .container {
            color: ${navSetting.font_color} !important;
        }
    `
    

    return (
        <>
            {/* <TailNav /> */}
            <NAV className="navbar navbar-expand-lg bg-body-tertiary shadow">
                <div className="container">
                    {
                        getToken() &&
                        <Pen onClick={() => setShowModal(true)} style={{cursor: 'pointer'}} />
                    }
                    <NavLink className="navbar-brand" to="/"> {navSetting.div_value ? navSetting.div_value : 'Crud App'}</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact us</NavLink>
                            </li>
                            {
                                getToken() 
                                && 
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/student/view">Show Students</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/images">Images</NavLink>
                                    </li>
                                </>
                            }
                            <li className="nav-item">
                                {
                                    getToken() ? <span role='button' className="nav-link" onClick={fLogout}>Logout</span> : <NavLink className="nav-link" to="/login">Login</NavLink>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </NAV>
            <Popup modalState = {showModal} closeModal = {setShowModal} divName = {'nav_customization'} />
        </>
    )
}

export default Navbar
