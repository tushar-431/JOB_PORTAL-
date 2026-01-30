import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      {/* generate a footer for current page */}
      <div className='text-center p-[20px] bg-[#f1f1f1]'>
        <p>© 2026 JobPortal. All rights reserved.</p>
        <p>Powered by <a href="">JobPortal</a></p>
        <p>
          <Link to="/privacyPolicy">Privacy Policy </Link> 
           | 
          <Link to="/termOfService"> Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer