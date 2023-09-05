import React from 'react'
import closeBtn from "../../../Assets/close.svg";
const CloseBtn = (props) => {
  return (
    <div className='flex items-center justify-center'>
    <div onClick={props.onClick} className="w-[50px]  "><img className="w-[50px] h-[50px] object-cover cursor-pointer" src={closeBtn} alt=""/></div>
    </div>
  )
}

export default CloseBtn