import React from 'react'
import { getProviders, signIn } from "next-auth/react"

const signin = ({ providers }) => {
  return (
    <div className='flex justify-center mt-20 space-x-8'>
          <img src="https://cdn.pixabay.com/photo/2015/03/09/13/51/phone-665690_960_720.png" alt="twitter auth logo" className='hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6' />
          <div className="">
            {
                Object.values(providers).map((provider, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1200px-Twitter_Bird.svg.png" alt="twitter logo" className='w-36 object-cover'/>
                        <p className='text-center text-sm italic my-10'>This app is created for demonstration purposes</p>
                        <button className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500' onClick={()=>signIn(provider.id, {callbackUrl: "/"})}>Sign In with {provider.name}</button>
                    </div>
                ))
            }
          </div>
    </div>
  )
}

export default signin

export async function getServerSideProps() {
    const providers = await getProviders()

    return{
        props: {
            providers,
        }
    }
}