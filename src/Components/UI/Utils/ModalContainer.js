import React from 'react'

const ModalContainer = (props) => {
  return (
    <div className='w-[100%] h-[100%]  overflow-hidden z-20 relative '>
        <div onClick={props.modalCloseHandler} className="w-[100%] h-[100%] fixed top-0 left-0 bg-[rgba(0,0,0,0.45)] overflow-hidden" />
        <div className='absolute w-[300px] h-auto '>{props.children}</div>
    </div>
  )
}

export default ModalContainer;