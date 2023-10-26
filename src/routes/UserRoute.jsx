import React from 'react'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { useDispatch } from 'react-redux'
import { currentUser } from '../function/auth'

const UserRoute = ({children}) => {

    const { user } = useSelector((state)=> ({...state}))

  return  user && user.token ? children : <LoadingToRedirect/>
  
}

export default UserRoute 