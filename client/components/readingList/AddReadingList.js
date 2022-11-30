import React, { useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import ReadingListService from '../../requests/services/ReadingListService';

import TextInput from "../common/input/TextInput";
import RoundedButton from "../common/buttons/RoundedButton"
import SmallHeader from "../common/SmallHeader"
import SuccessModal from '../common/modals/SuccessModal';
import ErrorModal from '../common/modals/ErrorModal';

function AddReadingList() {

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  const [formData, setFormData] = useState({
    readingListName: ""
  });

  function handleFormChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: value,
      };
    });
  }

  async function handleFormSubmission() {
    if(!formData.readingListName) {
      setShowErrorModal(true);
      return;
    }

    try {
      const res = await ReadingListService.addReadingList({
        email: user.data.email,
        name: formData.readingListName
      })
      console.log(res)
      setShowSuccessModal(true)
    } catch (err) {
      console.log(err)
      setShowErrorModal(true)
    }
  }

  

  return (
    <>
      {showSuccessModal && (
        <SuccessModal
          text="Add Reading List Successful"
          buttonText="Back"
          buttonOnClick={() => {
            setShowSuccessModal(false);
          }}
        />
      )}

      {showErrorModal && (
        <ErrorModal
          text="Add Reading List UnSuccessful"
          buttonText="Back"
          buttonOnClick={() => {
            setShowErrorModal(false);
          }}
        />
      )}

      <SmallHeader text="Add Reading Lists "/>
      
      <form className='flex flex-col gap-6 bg-gray-200 shadow-lg shadow-gray-600 py-4 px-4 w-96'>
        <TextInput
          label="Reading List Name"
          labelId="readingListName"
          placeholder="Enter the reading list name"
          name="readingListName"
          onChangeText={handleFormChange}
          value={formData.readingListName}
        />
        <div className='w-56' onClick={handleFormSubmission}>
          <RoundedButton text="Add Reading List"/>
        </div>
      </form>
    </>
  )
}

export default AddReadingList;
