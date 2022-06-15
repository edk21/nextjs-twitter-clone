import Image from 'next/image';
import React from 'react'

const News = (props) => {
    const { author, title, description, url, urlToImage, publishedAt, content, source } = props.article;
  return (
    <a href={url} target="_blank" rel="noreferrer">
        <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
            <div className="space-y-0.5">
                <h6 className='text-sm font-bold'>{title}</h6>
                <p className='text-xs font-medium text-gray-500'>{source.name}</p>
            </div>
            <div className="">
                  <Image className='rounded-xl' src={`/api/imageproxy?url=${encodeURIComponent(urlToImage)}`} alt="" width={70} height={70}></Image>
            </div>
        </div>
    </a>
  )
}

export default News