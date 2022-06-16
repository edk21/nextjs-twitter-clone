import React,{ useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../../atom/modalAtom'
import Modal from "react-modal"
import { XIcon } from '@heroicons/react/solid'
import { db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import Moment from 'react-moment'
import { useSession } from "next-auth/react"
import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'

const CommentModal = () => {
    const {data: session} = useSession();
    const [postId] = useRecoilState(postIdState)
    const [modal, setModal] = useRecoilState(modalState)
    const [comment, setComment] = useState("")
    const [post, setPost] = useState({})

    const sendComment = async () => {}

    useEffect(() => {
        onSnapshot(doc(db, "tweets", postId), (snapshot)=> {
            setPost(snapshot)
        })
    },[postId, db])
  return (
    <div>
        {modal && (
            <Modal 
                isOpen={modal}
                onRequestClose={()=> setModal(false)}
                className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-lg shadow-lg min-h-[10px] h-auto"
            >
                <div className="p-1">
                    <div className="border-b border-gray-200 py-2 px-1.5">
                        <div className="hover__effect w-10 h-10 flex items-center justify-center" onClick={()=> setModal(false)}>
                            <XIcon className='h-[22px] text-gray-700 cursor-pointer' />
                        </div>
                    </div>
                    <div className="p-2 flex items-center space-x-2 relative">
                        <span className='w-0.5 h-full z-[-1] absolute left-9 top-11 bg-gray-300'/>
                        <img className='h-11 w-11 rounded-full' src={post?.data()?.userImg} alt={post?.data()?.name} width={30} height={30} />
                        <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>
                        <span className='text-sm sm:text-[15px]'>@{post?.data()?.username}</span>
                        <span className='text-sm sm:text-[15px] hover:underline'>
                            <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>
                    <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>{post?.data()?.text}</p>
                    <div className='flex items-start p-3 space-x-3'>
                        <img
                            src={session.user.image}
                            height={40}
                            width={40}
                            alt="user profile"
                            className='rounded-full ml-2 object-contain cursor-pointer hover:brightness-95'
                        />
                        <div className="w-full divide-y vidide-gray-200">
                            <div className="">
                                <textarea
                                    className='w-full border-none focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[50px] text-gray-700'
                                    rows="2"
                                    placeholder='Write down a comment...'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2.5">
                            
                                <div className="flex">
                                    <div className="" 
                                    // onClick={() => filePickerRef.current.click()}
                                >
                                        <PhotographIcon className="h-10 w-10 hover__effect p-2 text-sky-500 hover:bg-sky-100" />
                                        {/* <input type="file" hidden ref={filePickerRef} onChange={AddImageToDb} /> */}
                                    </div>

                                    <EmojiHappyIcon className="h-10 w-10 hover__effect p-2 text-sky-500 hover:bg-sky-100" />
                                </div>
                                <button
                                    className='bg-blue-400 text-white rounded-full px-4 py-1.5 hover:brightness-95 font-bold shadow-md disabled:opacity-50'
                                    disabled={!comment.trim()}
                                    onClick={sendComment}
                                >
                                    Comment
                                </button>

                            </div>
                        </div>
                    </div>
                      
                </div>
                    
            </Modal>
        )}
    </div>
  )
}

export default CommentModal