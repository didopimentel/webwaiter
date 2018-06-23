import React from 'react'
import ReactLoading from 'react-loading'
import './Loading.css'

export const Loading = ({ type, color }) => (
  <div className="loading-container">
  <ReactLoading type={type} color={color} height={200} width={100}/>
  </div>
)
