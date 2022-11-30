import React, { useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import UserService from '../../requests/services/UserService';

import ReadingList from './ReadingList';
import SmallHeader from "../common/SmallHeader"

function MyReadingList() {

  const [user, setUser] = useLocalStorage("user", null);
  const [myReadingLists, setMyReadingLists] = useState([]);

  useEffect(() => {
    getMyReadingLists();
  }, [])

  async function getMyReadingLists() {
    const res = await UserService.getAllReadingLists({
      email: user.data.email
    })
    console.log(res);
    setMyReadingLists(res.data.data);
  }

  return (
    <>
      <SmallHeader text="My Reading Lists "/>
      <div className='flex flex-col gap-6'>
        {myReadingLists.map((readingList, i) => {
          return (
            <ReadingList data={readingList} />
          )
        })}
      </div>
    </>
  )
}

export default MyReadingList;
