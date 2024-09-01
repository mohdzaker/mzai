import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex justify-center items-center flex-col text-xl'>
      Dashboard
      <div>
      <Link href="/chat">
      <button className='p-5 rounded-lg bg-primary text-white'>Go to chat page</button>
      </Link>
      </div>
    </div>
  )
}

export default Dashboard
