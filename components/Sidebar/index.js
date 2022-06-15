import React from 'react'
import Image from "next/image"
import SidebarMenuItem from './SidebarMenuItem'
import { menuItems } from "./menuItems"
import { DotsHorizontalIcon } from '@heroicons/react/outline'

const Sidebar = () => {
    return (
        <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>
            {/* <twitter logo> */}
            <div className="hover__effect p-0 hover:bg-blue-100 xl:p-1 flex items-center justify-center">
                <Image 
                    src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1200px-Twitter_Bird.svg.png" 
                    height="50" 
                    width="50" 
                    alt="twitter logo">
                </Image>
            </div>

            {/* <menu> */}
            <div className="mt-4 mb-2.5 xl:items-start">
                {
                    menuItems.map((item, index) => (
                        <SidebarMenuItem key={index} text={item.text} Icon={item.Icon} active={item.Active} />
                    ))
                }
            </div>

            {/* <button> */}
            <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>

            {/* <mini profile> */}
            <div className="hover__effect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
                <Image className='h-10 w-10 rounded-full xl:mr-2' src="https://www.citypng.com/public/uploads/preview/hd-profile-user-round-blue-icon-symbol-transparent-png-11639594354dzabzsbpuv.png" height="50" width="50" alt="profile"></Image>
                <div className='leading-5 hidden xl:inline'>
                    <h4 className='font-bold'>John Doe</h4>
                    <p className='text-gray-500'>@johndoe</p>
                </div>
                <DotsHorizontalIcon className='hidden xl:inline h-5 xl:ml-8' />
            </div>
        </div>
    )
}

export default Sidebar
