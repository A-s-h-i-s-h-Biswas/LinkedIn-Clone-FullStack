import React from 'react'
import eye from "../../../Assets/eye.svg";
import connect from "../../../Assets/users-filled.svg";
import analytic from "../../../Assets/analytics.svg";
import search from "../../../Assets/search.svg";
const Analytics = () => {
  return (
    <div className='w-[100%] h-[280px] mt-2 flex flex-col rounded-md  justify-between bg-white p-[25px]'>
        <div className='flex flex-col'>
            <h3 className='font-bold opacity-70 text-[20px]'>Analytics</h3>
            <p className='flex items-center opacity-60'>
                <img className='w-[15px] h-[15px] object-cover' src={eye} alt=''/>
                <span className='text-[14px] pl-1'>Private to you</span>
            </p>
        </div>
        <div className='flex items-center cursor-pointer'>
            <div>
                <img className='w-[30px] h-[30px] object-cover' src={connect} alt=''/>
            </div>
            <div className='flex flex-col  pl-3'>
                <p className='font-bold opacity-70 text-[14px] hover:text-blue-600 hover:underline'>50 profile views</p>
                <p className='text-[14px] opacity-60'>Discover who's viewed your profile.</p>
            </div>
        </div>
        <div className='flex items-center cursor-pointer'>
            <div>
                <img className='w-[30px] h-[30px] object-cover' src={analytic} alt=''/>
            </div>
            <div className='flex flex-col  pl-3'>
                <p className='font-bold opacity-70 text-[14px] hover:text-blue-600 hover:underline'>501 post impressions</p>
                <p className='text-[14px] opacity-60'>Check out who's engaging with your posts.</p>
            </div>
        </div>
        <div className='flex items-center cursor-pointer'>
            <div>
                <img className='w-[30px] h-[30px] object-cover' src={search} alt=''/>
            </div>
            <div className='flex flex-col  pl-3'>
                <p className='font-bold opacity-70 text-[14px] hover:text-blue-600 hover:underline'>50 search appearances</p>
                <p className='text-[14px] opacity-60'>See how often you appear in search results.</p>
            </div>
        </div>
    </div>
  )
}

export default Analytics