import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
    const token=localStorage.getItem('token')
    if (token) {
        return (<Outlet />)
    }
    else {
        return (
            <Navigate to='/landing-page' />
        )
    }
}
export default PrivateRoute