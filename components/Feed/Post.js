import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import Moment from 'react-moment'

const Post = (props) => {
    const { id, name, username, userImg, image, text, timestamp } = props.post.data()
  return (
    <div className='flex grow p-3 cursor-pointer border-b border-gray-200'>
        {/*user profile image*/}
        <div className="mr-4">
            <img className='h-11 w-11 rounded-full' src={userImg} alt={name} width={30} height={30}/>
        </div>
        
        <div className="w-full">

            <div className="flex items-center justify-between">
                {/*user info*/}
                <div className="flex items-center space-x-1 white-nowrap">
                    <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{name}</h4>
                    <span className='text-sm sm:text-[15px]'>@{username}</span>
                    <span className='text-sm sm:text-[15px] hover:underline'>
                        <Moment fromNow>{timestamp.toDate()}</Moment>
                    </span>
                </div>
                
                <DotsHorizontalIcon className='h-10 hover__effect w-10 hover:bg-sky-100 hover:text-sky-500 p-2' />
            </div>

            {/*post text*/}
            <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{text}</p>

            {/*post image*/}
            <div className="">
                <img className='rounded-2xl mr-2 object-cover' src={image} alt={name} width={700} height={400}/>
            </div>

            {/*icons*/}
            <div className="flex items-center justify-between text-gray-500 p-2">
                <ChatIcon className='h-9 w-9 p-2 cursor-pointer hover__effect hover:text-sky-500 hover:bg-sky-100' />
                <TrashIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-red-600 hover:bg-red-100"/>
                <HeartIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-red-600 hover:bg-red-100"/>
                <ShareIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-sky-500 hover:bg-sky-100"/>
                <ChartBarIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-sky-500 hover:bg-sky-100"/>
            </div>
        </div>
    </div>
  )
}

export default Post