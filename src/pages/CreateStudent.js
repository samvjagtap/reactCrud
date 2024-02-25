import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function CreateStudent(params) {
    const [studentFormData, setStudentFormData] = useState({
        fullname : '',
        email : '',
        phone : '',
        password : ''
    })
    const [loading, setLoading] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});
    const param = useParams()
    const navigator = useNavigate();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get-user-detail/${param.id}`).then(res => {
            const studentData = res.data.data;
            setStudentFormData({
                fullname : studentData.name,
                email : studentData.email,
                phone : studentData.phone
            })
        }).catch((error) => {
            console.log(error.response);
        });
    },[param.id]);
    

    const fHandleInput = (e) => {
        const {name,value} = e.target
        setStudentFormData((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const fSubmitFormData = (e) => {
        e.preventDefault();
        setLoading(true);
        const studData = {
            name : studentFormData.fullname,
            email : studentFormData.email,
            phone : studentFormData.phone,
            password : studentFormData.password
        }
        if (params.operation === 'edit') {
            axios.put(`http://127.0.0.1:8000/api/update-user/${param.id}`, studData).then((res) => {
                alert(res.data.message)
                navigator('/student/view');
            }).catch((error) => {
                if (error.response.data.status === false && error.response.data.code === 400) {
                    setInputErrorList(error.response.data.error_message)
                    setLoading(false)
                } else if (error.response.status === 404) {
                    alert('Something went wrong');
                    setLoading(false)
                }
            })
        } else {
            axios.post(`http://127.0.0.1:8000/api/create-user`, studData).then((res) => {
                console.log(res);
                alert(res.data.message)
                setLoading(false)
                setStudentFormData({
                    fullname : '',
                    email : '',
                    phone : '',
                    password : ''
                });
                setInputErrorList({});
            }).catch((error) => {
                if (error.response.data.status === false && error.response.data.code === 400) {
                    setInputErrorList(error.response.data.error_message)
                    setLoading(false)
                } else if (error.response.status === 404) {
                    alert('Something went wrong');
                    setLoading(false)
                }
            })
        }
    }

    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>
                                    Add Student
                                    <Link to={'/student/view'} className='btn btn-primary float-end'>Show Student</Link>    
                                </h4>
                            </div>
                            <div className='card-boady'>
                                <form className='p-4' onSubmit={fSubmitFormData}>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label className="form-label">Full Name</label>
                                                <input name="fullname" onChange={fHandleInput} value={studentFormData.fullname} type="text" className="form-control" />
                                                <span>{inputErrorList.name}</span>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label className="form-label">Email address</label>
                                                <input name="email" onChange={fHandleInput} value={studentFormData.email} type="email" className="form-control" />
                                                <span>{inputErrorList.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="mb-3">
                                                <label className="form-label">Phone</label>
                                                <input name="phone" onChange={fHandleInput} value={studentFormData.phone} type="tel" className="form-control" />
                                                <span>{inputErrorList.phone}</span>
                                            </div>
                                        </div>
                                        {
                                            params.operation === 'create' ? (
                                                <div className='col-6'>
                                                    <div className="mb-3">
                                                        <label className="form-label">Password</label>
                                                        <input name="password" onChange={fHandleInput} value={studentFormData.password} type="tel" className="form-control" />
                                                        <span>{inputErrorList.password}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        {
                                            loading ? (
                                                <button className="btn btn-primary" disabled={true}>Saving...</button>
                                            ) : (
                                                <button type="submit" className="btn btn-primary">Submit</button>
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

export default CreateStudent
