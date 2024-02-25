import React, { useState } from 'react'
import Auth from "../components/Auth";

function Login() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    });
    
    const {http, saveToken} = Auth()
    
    const fHandleInputs = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name] : value
            }
        });
    }
    
    const fSubmitLoginForm = (e) => {
        e.preventDefault()
        setLoading(true)
        http.post('/login', formData).then(res => {
            if (res.status === 200) {
                setLoading(false)
                sessionStorage.setItem('token', JSON.stringify(res.data.access_token))
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                saveToken(res.data.user, res.data.access_token)
            }
        }).catch(error => {
            setLoading(false)
            if (error.response.status === 401) {
                alert('Unauthorized Login Createndials')
            }
        })
    }
    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6 m-auto'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>
                                    Login    
                                </h4>
                            </div>
                            <div className='card-boady'>
                                <form className='p-4' onSubmit={fSubmitLoginForm}>
                                    <div className="m-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" id="idEmail" name='email' value={formData.email} onChange={fHandleInputs} />
                                    </div>
                                    <div className="m-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" id="idPassword" name='password' value={formData.password} onChange={fHandleInputs} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        {
                                            loading ? (
                                                <div className="login-spinner"></div>
                                            ) : (
                                                <button className="btn btn-primary m-4">Login</button>
                                            )
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
