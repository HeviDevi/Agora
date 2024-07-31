import React from 'react';
import HeaderImg from '../../assets/img/annie-spratt-TywjkDHf0Ps-unsplash.jpg'

const Banner = () => {
    return (
        <div className='w-full flex flex-col md:flex-row items-center justify-center bg-[#4a000a] p-4 rounded-lg shadow-lg'>
            <div className='flex-1 text-center md:flex md:flex-col md:justify-center'>
            <h2 className='text-3xl md:text-5xl text-white leading-tight'>Find something</h2>
            <h2 className='text-3xl md:text-5xl text-white leading-tight'>just as unique</h2>
            <h2 className='text-3xl md:text-5xl text-white leading-tight'>as you</h2>
            </div>
            <div className='w-full md:w-1/2 mt-4 md:mt-0 md:ml-4 h-64 md:h-full'>
            <img
            src={HeaderImg}
            alt='Banner'
            className='w-full h-full object-cover rounded-lg'
            />
            </div>
        </div>
    )
}

export default Banner;