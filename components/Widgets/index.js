import { SearchIcon } from '@heroicons/react/outline'
import React,{ useState } from 'react'
import News from './News';
import { AnimatePresence, motion } from 'framer-motion'

const Widgets = ({ newsData, whoToFollowData }) => {
    const articles = newsData.articles;
    const folowers = whoToFollowData.results;
    
    const [articleNum, setArticleNum] = useState(3);
    const [userNum, setUserNum] = useState(3);
    const ShowLess = () => {
        if(articleNum > 3) {
            setArticleNum(articleNum - 3);
        }
    }
    const ShowLess1 = () => {
        if (userNum > 3) {
            setUserNum(userNum - 3);
        }
    }
  return (
    <div className='xl:w-[370px] hidden lg:inline ml-8 space-y-5'>
        <div className="lg:w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
            <div className="flex items-center p-3 rounded-full relative">
                <SearchIcon className='h-5 z-50 text-gray-500' />
                <input type="text" placeholder='Search ...' className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100' />
            </div>
        </div>
        <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
            <h4 className='font-bold text-xl px-4'>Latest News</h4>
            <AnimatePresence>
                {
                    articles.slice(0, articleNum).map((article, index) => (
                        <motion.div 
                            key={index}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 1}}
                        >
                           <News article={article} /> 
                        </motion.div>
                        
                    ))
                }
            </AnimatePresence>
            
            <button className='text-blue-300 pl-4 pb-3 hover:text-blue-400' onClick={()=> setArticleNum(articleNum + 3)}>Show more</button>
                {
                    articleNum > 3 && <button className='text-blue-300 pl-4 pb-3 hover:text-blue-400 float-right mr-4' onClick={ShowLess}>Show less</button>
                }
        </div>
        <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
            <h4 className='font-bold text-xl px-4'>Who to Follow</h4>
            <AnimatePresence>
            {
                folowers.slice(0, userNum).map((folower, index) => (
                    <motion.div 
                        key={index}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 1}}
                    >
                    <div key={index} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out">
                        <img className='rounded-full' src={folower.picture.thumbnail} alt="user" width="40" height="40"/>
                        <div className="truncate ml-4 leading-5">
                            <h4 className='text-bold hover:underline text-[14px] truncate'>{folower.login.username}</h4>
                            <h5 className='text-[13px] text-gray-500 truncate'>{folower.name.first + " " + folower.name.last}</h5>
                            
                        </div>
                        <button className='ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold'>Follow</button>
                    </div>
                    </motion.div>
                ))
            }
            </AnimatePresence>
            <button className='text-blue-300 pl-4 pb-3 hover:text-blue-400' onClick={() => setUserNum(userNum + 3)}>Show more</button>
                {
                  userNum > 3 && <button className='text-blue-300 pl-4 pb-3 hover:text-blue-400 float-right mr-4' onClick={ShowLess1}>Show less</button>
              }
              
        </div>
    </div>
  )
}

export default Widgets