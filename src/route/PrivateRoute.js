import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({user, children}) => {
  return (
    user ? children : <Navigate to="/login"></Navigate>
  )
}
 
export default PrivateRoute
