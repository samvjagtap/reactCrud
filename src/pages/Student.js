import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loding from '../components/Loding';
import Pagination from 'react-js-pagination'

function Student() {

    const [studentData, setStudentData] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [data, setdata] = useState({
        'code' : 100,
        'status' : false
    })
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get-user?page=${page}`).then(res => {
            if (res.data.code === 200 && res.data.status === true) {
                // let oData = res.data.data;
                setStudentData(res.data.data)
                setLoading(false)
            } else {
                setStudentData('Data Not Found');
            }
        })
    }, [page]);

    const fetchData = (page) => {
        axios.get(`http://127.0.0.1:8000/api/get-user?page=${page}`).then(res => {
            if (res.data.code === 200 && res.data.status === true) {
                // let oData = res.data.data;
                setStudentData(res.data.data)
                setLoading(false)
            } else {
                setStudentData('Data Not Found');
            }
        })
    }

    const fDeleteStudent = (e, iID) => {
        const btn = e.currentTarget;
        btn.innerText = 'Deleting...';
        axios.delete(`http://127.0.0.1:8000/api/delete-user/${iID}`).then(res => {
            if (res.data.code === 200) {
                alert(res.data.message);
                btn.closest('tr').remove();
            } else {
                alert(res.data.message);
                btn.innerText = 'Delete';
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                alert('Something went wrong, 404');
                btn.innerText = 'Delete';
            } else if (error.response.status === 500) {
                alert('Server Issue, 500');
                btn.innerText = 'Delete';
            }
        })
    }


    return (
        <>
            {
                loading ? (
                    <Loding />
                ) : (
                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4>
                                            Student List
                                            <Link to={'/student/create'} className='btn btn-primary float-end'>Add Student</Link>    
                                        </h4>
                                    </div>
                                    <div className='card-boady'>
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    studentData 
                                                    &&
                                                    studentData.data.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index+1}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.email}</td>
                                                                <td>
                                                                    <Link to={`/student/edit/${item.id}`} className='btn btn-success'>Edit</Link>
                                                                </td>
                                                                <td>
                                                                    <button onClick={(e) => fDeleteStudent(e, item.id)} className='btn btn-danger'>Delete</button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }) 
                                                }
                                            </tbody>
                                        </table>
                                        <div className='pagination d-flex align-items-center justify-content-center'>
                                        <Pagination
                                            activePage={studentData.current_page} 
                                            totalItemsCount={studentData.total}
                                            itemsCountPerPage={studentData.per_page}
                                            onChange={(page) => fetchData(page)} 
                                            itemClass='page-item'
                                            linkClass='page-link'
                                            firstPageText={'First'}
                                            lastPageText={'Last'}
                                            breakLabel="..."
                                        />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Student
