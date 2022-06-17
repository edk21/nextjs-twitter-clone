import React,{useState, useEffect} from 'react'
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid, SortAscendingIcon } from '@heroicons/react/solid'
import Moment from 'react-moment'
import { db, storage } from '../../firebase'
import { useSession, signIn } from "next-auth/react"
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../../atom/modalAtom'
import { useRouter } from 'next/router'
import Loader from '../Loader'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'

const Comments = ({originalPostId, comment, commentId}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [likes, setLikes] = useState([])
  const [modal, setModal] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [hasLiked, setHasLiked] = useState(false)


  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tweets", originalPostId, "comments", commentId, "likes"), (snapshot) => setLikes(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db, originalPostId, commentId])

  useEffect(() => {
    setHasLiked(likes.findIndex(like => like.id === session?.user.uid) !== -1)
  }, [likes])

  const likeAComment = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "tweets", originalPostId, "comments", commentId, "likes", session?.user.uid))
      } else {
        await setDoc(doc(db, "tweets", originalPostId, "comments", commentId, "likes", session?.user.uid), {
          username: session.user.username,
        })
      }
    } else {
      signIn();
    }
  }
  const deleteAComment = async () => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      await deleteDoc(doc(db, "tweets", originalPostId, "comments", commentId))
    }
  }

    if(!comment){
      return <Loader />
    }

  return (
    <div className='flex grow p-3 cursor-pointer border-b border-gray-200 pl-16'>
      {/*user profile image*/}
      <div className="mr-4">
        <img className='h-11 w-11 rounded-full' src={comment?.userImg} alt={comment?.name} width={30} height={30} />
      </div>

      <div className="flex-1 w-full">

        <div className="flex items-center justify-between">
          {/*user info*/}
          <div className="flex items-center space-x-1 white-nowrap">
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{comment?.name}</h4>
            <span className='text-sm sm:text-[15px]'>@{comment?.username}</span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
          </div>

          <DotsHorizontalIcon className='h-10 hover__effect w-10 hover:bg-sky-100 hover:text-sky-500 p-2' />
        </div>

        {/*post text*/}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{comment?.comment}</p>

        {/*post image*/}
        {/* <div className="">
          {
            comment?.data().image && <img className='rounded-2xl mr-2 object-cover' src={comment.data()?.image} alt={comment.data()?.name} width={700} height={400} />
          }

        </div> */}

        {/*icons*/}
        <div className="flex items-center justify-between text-gray-500 p-1">
          <div className="flex items-center space-x-1">
            <ChatIcon className='h-9 w-9 p-2 cursor-pointer hover__effect hover:text-sky-500 hover:bg-sky-100' onClick={() => {
              if (!session) {
                signIn();
              } else {
                setPostId(originalPostId)
                setModal(!modal)
              }

            }}
            />
            {/* {
              comments.length === 1 ? <span className="text-sm select-none">1 Comment</span> : comments.length > 1 ? <span className="text-sm select-none">{comments.length} Comments</span> : null
            } */}
          </div>
          {
            session?.user.uid === comment?.userId && (
              <TrashIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-red-600 hover:bg-red-100" onClick={() => deleteAComment()} />)
          }

          <div className=" flex items-center">
            {
              hasLiked ?
                <HeartIconSolid className="h-9 w-9 p-2 cursor-pointer hover__effect text-red-600 hover:bg-red-100" onClick={likeAComment} />
                :
                <HeartIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-red-600 hover:bg-red-100" onClick={likeAComment} />
            }
            {
              likes.length === 1 ? <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>1 like</span> : likes.length > 1 ? <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>{likes.length} likes</span> : null
            }
          </div>

          <ShareIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 p-2 cursor-pointer hover__effect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}

export default Comments