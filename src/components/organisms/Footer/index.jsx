import React from 'react'
import facebook from './../../../assets/facebook.png'
import instagram from './../../../assets/instagram.png'
import twitter from './../../../assets/twitter.png'
import youtube from './../../../assets/youtube.png'

export const Footer = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center mt-12 max-[700px]:mx-2.5 max-[500px]:block  max-[500px]:text-center '>
            <div className='flex w-1/5 justify-between max-[530px]:w-8/12 max-[500px]:m-auto '>
                <img src={facebook} alt="facebook" />
                <img src={instagram} alt="facebook" />
                <img src={twitter} alt="facebook" />
                <img src={youtube} alt="facebook" />
            </div>
            <div className='text-black flex text-lg font-medium py-8  max-[500px]:block  max-[500px]:px-0  max-[500px]:py-0 max-[500px]:my-5 '>
                <p className='mr-10  max-[500px]:mx-0 max-[500px]:my-0 max-[500px]:mb-2.5'>Conditions of Use</p>
                <p className='max-[500px]:mb-2.5'>Privacy & Policy</p>
                <p className='ml-10 max-[500px]:mx-0 max-[500px]:my-0 max-[500px]:mb-2.5'>Press Room</p>
            </div>
            <div className='text-grey pb-10'>
                <p>© 2023 MovieBox by Oghenefejiro Eva Gbaje</p>
            </div>
        </div>
    )
}
