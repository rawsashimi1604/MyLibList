import React, { useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import ReadingListService from '../../requests/services/ReadingListService';

import ReadingList from './ReadingList';
import SmallHeader from "../common/SmallHeader"

function AllReadingLists() {

  const [allReadingLists, setAllReadingLists] = useState([]);

  useEffect(() => {
    getAllReadingLists();
  }, [])

  async function getAllReadingLists() {
    try {
      const res = await ReadingListService.getAllReadingLists()
      setAllReadingLists(res.data.data);
    } catch (err) {
      console.log(err)
    }
    
  }
  return (
    <>
      <SmallHeader text="All Reading Lists "/>
      <div className='flex gap-6 flex-col'>
        {allReadingLists.map((readingList, i) => {
          return (
            <ReadingList data={readingList} />
          )
        })}
      </div>
    </>
  )
}

export default AllReadingLists;
