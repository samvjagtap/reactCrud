import React, { useEffect } from 'react'
import Auth from './Auth'
import { useNavigate } from 'react-router-dom'

function ProtectedPages(props) {
    const {Component, operation} = props
    const {getToken} = Auth()
    const navigator = useNavigate();
    useEffect(() => {
        if (!getToken()) {
            navigator('/login')
        }
    })
    
    return (
        <>
            <Component operation = {operation}></Component>
        </>
    )
}

export default ProtectedPages
