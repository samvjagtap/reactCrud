import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Popup(props) {
    const [customizationForm, setCustomizationForm] = useState({
        div_name : 'nav_customization',
        div_value : '',
        font_color : '',
        font_type : '',
        font_size : '',
        bg_color : ''
    })
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate();

    const fHandleInput = (e) => {
        const {name,value} = e.target
        setCustomizationForm((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }
    const fSubmitCustomizationForm = (e) => {
        e.preventDefault();
        setLoading(true)
        let formData = {
            div_name : customizationForm.div_name,
            div_value : customizationForm.div_value,
            font_color : customizationForm.font_color,
            font_type : customizationForm.font_type,
            font_size : customizationForm.font_size,
            bg_color : customizationForm.bg_color
        }
        axios.post('http://127.0.0.1:8000/api/customization', formData).then(res => {
            alert(res.data.message)
            setLoading(false)
            props.closeModal(false)
            setCustomizationForm({})
            navigator('/student/view');
        }).catch(error => {
            if (error.response.data.status === false && error.response.data.code === 400) {
                setLoading(false)
                setCustomizationForm({})
                props.closeModal(false)
            } else if (error.response.status === 404) {
                alert('Something went wrong');
                setCustomizationForm({})
                setLoading(false)
                props.closeModal(false)
            }
        })
    }
    useEffect(() => {
        let divName = props.divName
        axios.get(`http://127.0.0.1:8000/api/getCustomization/${divName}`).then(res => {
            if (res.data.code === 200) {
                let data = res.data.data
                setCustomizationForm({
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
                setCustomizationForm({})
            } else if (error.response.data.status === false && error.response.data.code === 400) {
                setCustomizationForm({})
            }
        })
    }, [props.modalState])
    return (
        <div>
            {
                props.modalState && 
                <form onSubmit={fSubmitCustomizationForm}>
                    <input type='hidden' name='div_name' value='nav_customization' />
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Modal Header</h2>
                                <span className="close" onClick={() => props.closeModal(false)} >&times;</span>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="mb-3">
                                            <label className="form-label">Logo Text</label>
                                            <input type="text" name='div_value' value={customizationForm.div_value} className="form-control" onChange={fHandleInput} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mb-3">
                                            <label className="form-label">Font Color</label>
                                            <input type="color" name='font_color' value={customizationForm.font_color} className="form-control" style={{height: '35px'}} onChange={fHandleInput} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mb-3">
                                            <label className="form-label">Background Color</label>
                                            <input type="color" name='bg_color' value={customizationForm.bg_color} className="form-control" style={{height: '35px'}} onChange={fHandleInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label className="form-label">Font Type</label>
                                        <select className="form-select" name='font_type' value={customizationForm.font_type} onChange={fHandleInput}>
                                            <option value="">Select</option>
                                            <option style={{fontWeight: 'bold', backgroundColor: '#EEEEEE'}}>Serif Fonts</option>
                                            <option value="Georgia,serif" style={{fontFamily: 'Georgia,serif'}}>Georgia</option>
                                            <option value="Palatino Linotype,Book Antiqua,Palatino,serif" style={{fontFamily: 'Palatino Linotype,Book Antiqua,Palatino,serif'}}>Palatino Linotype</option>
                                            <option value="Times New Roman,Times,serif" style={{fontFamily: 'Times New Roman,Times,serif'}}>Times New Roman</option>
                                            <option value="Arial,Helvetica,sans-serif" style={{fontFamily: 'Arial,Helvetica,sans-serif'}}>Arial</option>
                                            <option value="Arial Black,Gadget,sans-serif" style={{fontFamily: 'Arial Black,Gadget,sans-serif'}}>Arial Black</option>
                                            <option value="Comic Sans MS,cursive,sans-serif" style={{fontFamily: 'Comic Sans MS,cursive,sans-serif'}}>Comic Sans MS</option>
                                            <option value="Impact,Charcoal,sans-serif" style={{fontFamily: 'Impact,Charcoal,sans-serif'}}>Impact</option>
                                            <option value="Lucida Sans Unicode,Lucida Grande,sans-serif" style={{fontFamily: 'Lucida Sans Unicode,Lucida Grande,sans-serif'}}>Lucida Sans Unicode</option>
                                            <option value="Tahoma,Geneva,sans-serif" style={{fontFamily: 'Tahoma,Geneva,sans-serif'}}>Tahoma</option>
                                            <option value="Trebuchet MS,Helvetica,sans-serif" style={{fontFamily: 'Trebuchet MS,Helvetica,sans-serif'}}>Trebuchet MS</option>
                                            <option value="Verdana,Geneva,sans-serif" style={{fontFamily: 'Verdana,Geneva,sans-serif'}}>Verdana</option>
                                            <option value="Monospace" style={{fontFamily: 'Monospace', fontWeight: 'bold'}}>Monospace Fonts</option>
                                            <option value="Courier New,Courier,monospace" style={{fontFamily: 'Courier New,Courier,monospace'}}>Courier New</option>
                                            <option value="Lucida Console,Monaco,monospace" style={{fontFamily: 'Lucida Console,Monaco,monospace'}}>Lucida Console</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <div className="mb-3">
                                            <label className="form-label">Font Size</label>
                                            <input type="number" name='font_size' value={customizationForm.font_size} className="form-control" onChange={fHandleInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    {
                                        loading ? (
                                            <div className="login-spinner"></div>
                                        ) : (
                                            <button className="btn btn-primary">Submit</button>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <h3>Modal Footer</h3>
                            </div>
                        </div>
                    </div>
                </form>
                
            }
        </div>
    )
}

export default Popup
