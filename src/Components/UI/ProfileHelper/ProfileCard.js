import React from 'react'
import pen from "../../../Assets/pen.svg";
// import add from "../../Assets/plus.svg";
const ProfileCard = ({title, logo, heading, timestamp, text, edit=true, openEdit}) => {
  return (
    <div className='w-[100%] max-h-[250px] mt-2 flex flex-col rounded-md  justify-between bg-white p-[25px]'>
        <div className='w-[100%] flex justify-between items-center'>
            <h2 className='text-[20px] font-bold opacity-70'>{heading}</h2>
            {edit && <div className='flex w-[18%] justify-between'>
                {/* <img  className='w-[25px] h-[25px] object-cover cursor-pointer' src={add} alt=''/> */}
                <img onClick={openEdit} className='w-[25px] h-[25px] object-cover cursor-pointer' src={pen} alt=''/>
            </div>}
        </div>
        <div className='flex items-center pt-3'>
            <div className='w-[50px] h-[60px] '>
            <img className='w-[100%] h-[100%] object-cover' src={logo} alt=''/>
            </div>
            <div className='flex flex-col pl-3'>
                <p className='font-bold opacity-70 text-[17px]'>{title}</p>
                <p className='opacity-80 text-[14px]'>{text}</p>
                <p className='opacity-60 text-[14px]'>{timestamp}</p>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard