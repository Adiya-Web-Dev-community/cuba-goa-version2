import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PublicRoute() {
    const token=localStorage.getItem('token')
    //console.log(userData)
    if ((!token)) {
        return (<Outlet />)
    }
    else {
        return (
            <Navigate to='/' />
        )
    }
}
export default PublicRoute;