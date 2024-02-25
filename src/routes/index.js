import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Student from '../pages/Student'
import CreateStudent from '../pages/CreateStudent'
import Login from '../pages/Login'
import Auth from '../components/Auth'
import ProtectedPages from '../components/ProtectedPages'
import Images from '../components/Images'

function Index() {
    const { getToken } = Auth();
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/contact' element={<Contact />}></Route>
                <Route path='/student/view' element={<ProtectedPages Component={Student} />}></Route>
                <Route path='/student/create' element={<ProtectedPages Component={CreateStudent} operation = 'create' />}></Route>
                <Route path='/student/edit/:id' element={<ProtectedPages Component={CreateStudent} operation = 'edit' />}></Route>
                { !getToken() && <Route path='/login' element={<Login />}></Route> }
                <Route path='/images' element={<ProtectedPages Component={Images} />}></Route>
                {/* <Route path='*' element={<Home />}></Route> */}
            </Routes>
        </>
    )
}

export default Index
