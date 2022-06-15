import React,{useState, useEffect} from 'react'
import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'

const FeedInput = () => {
    const [loadData, setLoadData] = useState([])
    const {data: session} = useSession();

    useEffect(() => {
        if(session){
            setLoadData(session.user)
        }else{
            setLoadData("https://www.citypng.com/public/uploads/preview/hd-profile-user-round-blue-icon-symbol-transparent-png-11639594354dzabzsbpuv.png")
        }
    },[session])
    console.log("session", loadData.image);
  return (
    <>
    {
        session && (
        <div className='flex items-start border-b border-gray-200 p-3 space-x-3'>
            <img
                src={loadData.image}
                height={40}
                width={40}
                alt="user profile"
                className='rounded-full object-contain cursor-pointer hover:brightness-95'
                onClick={() => signOut()}
            />
            <div className="w-full divide-y vidide-gray-200">
                <div className="">
                    <textarea className='w-full border-none focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[50px] text-gray-700' rows="2" placeholder='Write down a new tweet'></textarea>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex">
                        <PhotographIcon className="h-10 w-10 hover__effect p-2 text-sky-500 hover:bg-sky-100" />
                        <EmojiHappyIcon className="h-10 w-10 hover__effect p-2 text-sky-500 hover:bg-sky-100" />
                    </div>
                    <button className='bg-blue-400 text-white rounded-full px-4 py-1.5 hover:brightness-95 font-bold shadow-md disabled:opacity-50' disabled>Tweet</button>
                </div>
            </div>
        </div>
        )
    }
    </>
  )
}

export default FeedInput