"use client"
import React from 'react'
import './CountDown.scss'
import Countdown from 'react-countdown'

const CountDown = ({date}:{date:Date}) => {
  console.log(date)
  const endingDate = new Date(date)
  return (
    <Countdown date={endingDate} className='countdown'/>
  )
}

export default CountDown