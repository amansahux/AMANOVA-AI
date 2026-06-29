import React from 'react'
import useAuth from '../../auth/hook/useAuth'

const Dashboard = () => {
  const {user} = useAuth()
    console.log("Loggedin User ---->" , user)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard