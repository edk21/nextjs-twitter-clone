import React,{useState, useRef} from 'react'
import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

const FeedInput = () => {
    
    const [tweet, setTweet] = useState('')
    const [tweetImage, setTweetImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const {data: session} = useSession();
    const filePickerRef = useRef(null)

    const sendTweet = async () => {
        if(loading) return
        setLoading(true)

        const docRef = await addDoc(collection(db, "tweets"),{
            id: session.user.uid,
            text: tweet,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username,
        })

        const imageRef = ref(storage, `tweets/${docRef.id}/image`);

        if (tweetImage){
            await uploadString(imageRef, tweetImage, "data_url").then( async()=> {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "tweets", docRef.id),{
                    image: downloadURL,
                })
            })
        }

        setTweet("");
        setTweetImage(null);
        setLoading(false)
    }

    const AddImageToDb = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            const selectedImage = readerEvent.target.result;
            setTweetImage(selectedImage);
        }
    }

  return (
    <>
    {
        session && (
        <div className='flex items-start border-b border-gray-200 p-3 space-x-3'>
            <img
                src={session.user.image}
                height={40}
                width={40}
                alt="user profile"
                className='rounded-full object-contain cursor-pointer hover:brightness-95'
                onClick={() => signOut()}
            />
            <div className="w-full divide-y vidide-gray-200">
                <div className="">
                    <textarea 
                        className='w-full border-none focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[50px] text-gray-700' 
                        rows="2" 
                        placeholder='Write down a new tweet'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    ></textarea>
                </div>
                {
                    tweetImage && ( <div className="relative">
                        <XIcon className='h-7 border text-black shadow-lg rounded-full m-1 cursor-pointer absolute' onClick={()=>setTweetImage(null)} />
                        <img src={tweetImage} alt="tweet-image" className={`${loading && "animate-pulse"}`} />
                    </div>)
                }
                <div className="flex items-center justify-between pt-2.5">
                    {
                        !loading &&(
                            <>
                            <div className="flex">
                                <div className="" onClick={() => filePickerRef.current.click()}>
                                    <PhotographIcon className="h-10 w-10 hover__effect p-2 text-sky-500 hover:bg-sky-100" />
                                    <input type="file" hidden ref={filePickerRef} onChange={AddImageToDb} />
                                </div>

                                <EmojiHappyIcon className="h-10 w-10 hover__effect p-2 text-sky-500 hover:bg-sky-100" />
                            </div>
                            <button
                                className='bg-blue-400 text-white rounded-full px-4 py-1.5 hover:brightness-95 font-bold shadow-md disabled:opacity-50'
                                disabled={!tweet.trim()}
                                onClick={sendTweet}
                            >
                                Tweet
                            </button>
                            </>
                        ) 
                    }
                   
                </div>
            </div>
        </div>
        )
    }
    </>
  )
}

export default FeedInput