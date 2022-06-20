import React, { Component } from 'react'
import loading from './loading.gif'

export class LoadGen extends Component {
  render() {
    return (
      
      <div className="text-center">
        <img className='mb-4 mt-2' src={loading} alt="Loading" />
      </div>
    )
  }
}

export default LoadGen