import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'

export default function Home({ newsData, whoToFollowData }) {
  return (
    <div>
      <Head>
        <title>NextJs TwitterClone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex min-h-screen mx-auto'>
        {/* <Sidebar> */}
        <Sidebar />

        {/* <Feed section> */}
        <Feed />

        {/* <Widgets> */}
        <Widgets newsData={newsData} whoToFollowData={whoToFollowData} />

        {/* <Modal> */}

      </main>
      
    </div>
  )
}

{/* 
  https://saurav.tech/NewsAPI/top-headlines/category/technology/fr.json
*/}

export async function getServerSideProps() {
  const newsRes = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/fr.json')
  const newsData = await newsRes.json()

  const whoToFollowRes = await fetch('https://randomuser.me/api/?results=30&inc=name,picture,login');
  const whoToFollowData = await whoToFollowRes.json();

  return {
    props: {
      newsData,
      whoToFollowData
    }
  }
}