import Link from 'next/link'
import React from 'react'
import './Footer.scss'
const Footer = () => {
  return (
    <div className='footer'>
        <Link href='/'>SVIDOMA</Link>
        <p>© ALL RIGHTS RESERVED </p>
    </div>
  )
}

export default Footer