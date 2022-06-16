import React from 'react'
import Image from "next/image"
import SidebarMenuItem from './SidebarMenuItem'
import { useSession, signIn, signOut } from 'next-auth/react'
import { HomeIcon } from "@heroicons/react/solid"
import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, ClipboardIcon, UserIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon } from "@heroicons/react/outline"

const Sidebar = () => {
    const { data: session } = useSession();
    //console.log(session)
    return (
        <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>
            {/* <twitter logo> */}
            <div className="hover__effect p-0 hover:bg-blue-100 xl:p-1 flex items-center justify-center">
                <Image 
                    src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1200px-Twitter_Bird.svg.png" 
                    height="50" 
                    width="50" 
                    alt="twitter logo"
                    >
                </Image>
            </div>

            {/* <menu> */}
            <div className="mt-4 mb-2.5 xl:items-start">
                <SidebarMenuItem text="Home" Icon={HomeIcon} active />
                <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
                {
                    session && (
                        <>
                            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
                            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
                            <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
                            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
                            <SidebarMenuItem text="Profile" Icon={UserIcon} />
                            <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
                        </>
                    )
                }
            </div>

            {/* <button> */}
            {
                session ? (
            <>
                <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>

                
                <div className="hover__effect text-gray-700 flex items-center justify-center xl:justify-start mt-auto" onClick={signOut}>
                    <Image className='h-10 w-10 rounded-full xl:mr-2' src={session.user.image} height="50" width="50" alt="profile"></Image>
                    <div className='leading-5 hidden xl:inline ml-2'>
                        <h4 className='font-bold'>{session.user.name}</h4>
                        <p className='text-gray-500'>@{session.user.username}</p>
                    </div>
                    <DotsHorizontalIcon className='hidden xl:inline h-5 xl:ml-8' />
                </div>
            </>
            ) : (
                <button onClick={signIn} className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Sign In</button>
            )}
            
        </div>
    )
}

export default Sidebar
