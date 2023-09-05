import React from 'react'
import notFound from "../../Assets/404iimg.png";
const NotFound = () => {
  return (
    <div className='w-[100%] h-screen overflow-hidden'>
        <img className='w-[100%] h-[90%] object-cover' src={notFound} alt=''/>
    </div>
  )
}

export default NotFound