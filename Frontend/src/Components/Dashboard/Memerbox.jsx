import React from 'react'
import { Link } from 'react-router-dom'

const Memerbox  = ({ icon, text, isPrimary, path }) => {
  return (
    <div
    className={`col-md-5 ms-4 mb-3 text-center p-4 ${isPrimary ? 'text-white bg-primary' : 'text-dark'}`}
    style={{
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }}
  >
    {icon}
    <Link className={`dashboard-link ${!isPrimary && "text-dark"}`}to={path}><h5>{text}</h5></Link>
  </div>
  )
}

export default Memerbox