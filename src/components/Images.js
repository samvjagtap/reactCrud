import axios from 'axios'
import React, { useState } from 'react'

function Images() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        image_name : ''
    })
    const fHandleInput = (e) => {
        const {name,value} = e.target
        setFormData((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }
    const fSubmitFormData = (e) => {
        e.preventDefault();
        let aData = new FormData()
        console.log(formData.image_name);
        aData.append('image_name', formData.image_name)
        console.log(aData);
        axios.post(`http://127.0.0.1:8000/api/set_image`, aData).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <>
            <div className='container mt-4'>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-6 m-auto'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>
                                        Add Image
                                    </h4>
                                </div>
                                <div className='card-boady'>
                                    <form>
                                        <div className="mt-4 me-4 ms-4">
                                            <input name='image_name' value={formData.image_name} onChange={fHandleInput} className="form-control" type="file" id="formFile" />
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            {
                                                loading ? (
                                                    <div className="login-spinner m-4"></div>
                                                ) : (
                                                    <button className="btn btn-primary m-4" onClick={fSubmitFormData}>Save</button>
                                                )
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Images
