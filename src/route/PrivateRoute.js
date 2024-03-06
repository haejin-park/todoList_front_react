import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({user, children}) => {
  return (
    user ? children : <Navigate to="/login"></Navigate>
  )
}

/*
user값이 있으면
? TodoPage 보여주고 (다른 페이지도 권한 확인 하고싶을 떄 PrivateRoute를 공용으로 쓸 수 있도록 TodoPage로 고정하지말고 children이라 쓸것)
: 없으면 redirect to /login (redirect할 땐 Navigate)

=> user라는 state가 필요 => App에 만들어서 넘겨주기(나중에 다른 페이지에서 권한 확인 가능하게)
*/
 
export default PrivateRoute
