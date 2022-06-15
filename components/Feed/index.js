import { SparklesIcon } from '@heroicons/react/outline'
import { posts } from './dummydata'
import FeedInput from './FeedInput'
import Post from './Post'

const Feed = () => {
    
  return (
    <div className='xl:ml-[370px] border-r border-l border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
        <div className='flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className="hover__effect flex items-center justify-center px-0 ml-auto w-9 h-9">
                <SparklesIcon className='h-5' />
            </div>
        </div>
        <FeedInput />
        {
            posts.map(post => (
                <Post key={post.id} post={post}/>
            ))
        }
    </div>
  )
}

export default Feed