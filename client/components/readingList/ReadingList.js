import React from 'react'
import Link from 'next/link'

function ReadingList({ data }) {
  return (
    <Link href={`/list/${data.reading_list_id}`}>
      <div className='font-Montserrat inline-flex gap-6 bg-cyan-800 px-8 py-4 text-white rounded-lg shadow-lg shadow-gray-400 transition-all duration-150 hover:translate-x-2 cursor-pointer'>
        <div>
          <div className='text-xl font-light'>ID</div>
          <h3 className='text-lg font-md'>{data.reading_list_id}</h3>
        </div>
        
        <div>
          <div className='text-xl font-light'>Name</div>
          <h3 className='text-lg font-md'>{data.name}</h3>
        </div>

        <div>
          <div className='text-xl font-light'>Owner</div>
          <h3 className='text-lg font-md'>{data.email}</h3>
        </div>

      </div>
    </Link>
  )
}

export default ReadingList