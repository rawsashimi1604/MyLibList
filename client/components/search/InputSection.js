import React from "react";
import { useState } from "react";
import BookService from "../../requests/services/BookService";
import TextInput from "../common/input/TextInput";
import FullWidthButton from "../common/buttons/Button";
import Header from "../common/Header";
import GetBooks from "./GetBooks"
import ErrorText from "../common/ErrorText"

function InputSection({ setBooks }) {
  const [form, setForm] = useState({
    book_uuid: "",
    title: "",
    language: "",
    collection: "",
    subject: "",
    contributor: "",
    lcsh: "",
    publisher: "",
  });
  
  const [searchError, setSearchError] = useState("")

  function handleFormChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: value,
      };
    });
  }

  async function handleFormSubmit() {
    let str = "?";
    let count = 0;

    if(form.book_uuid){
      str += "book_uuid=" + form.book_uuid + "&"
      count++;
    }
    if(form.title){
      str += "title=" + form.title + "&"
      count++;
    }
    if(form.language){
      str += "language=" + form.language + "&"
      count++;
    }
    if(form.collection){
      str += "collection=" + form.collection + "&"
      count++;
    }
    if(form.subject){
      str += "subject=" + form.subject + "&"
      count++;
    }
    if(form.contributor){
      str += "contributor=" + form.contributor + "&"
      count++;
    }
    if(form.lcsh){
      str += "lcsh=" + form.lcsh + "&"
      count++;
    }
    if(form.publisher){
      str += "publisher=" + form.publisher
      count++;
    }

    // everything was null...
    if (count === 0) {  
      setSearchError("At least 1 field must be filled.")
      return;
    } else if (count === 0 && form.title.length <= 2) {
      setSearchError("title must be at least 3 characters")
      return;
    }

    // Submit search request
    try {
      const res = await BookService.searchBook(str);
      console.log(res.data.data)
      setBooks(res.data.data)
    } catch (err) {
      console.log(err)
      setSearchError("Something went wrong")
    }
  }


  return (
    <>
      <Header text="Search for Books" />

      <form className="flex flex-col justify-center">
        <div className="flex flex-row gap-4 w-full text-2xl mb-6">
          <div className="w-[50%]">
            <TextInput
              label="Title"
              labelId="title"
              name="title"
              placeholder="Enter the title"
              onChangeText={handleFormChange}
              value={form.title}
            />
          </div>
          <div className="flex-grow mr-8">
            <TextInput
              label="UUID"
              labelId="uuid"
              name="book_uuid"
              placeholder="Enter the uuid"
              onChangeText={handleFormChange}
              value={form.book_uuid}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full text-2xl mb-6">
          <div className="w-[33%] ">
            <TextInput
              label="Language"
              labelId="language"
              name="language"
              placeholder="Enter the language"
              onChangeText={handleFormChange}
              value={form.language}
            />
          </div>

          <div className="w-[33%]">
            <TextInput
              label="Collection"
              labelId="collection"
              name="collection"
              placeholder="Enter the collection"
              onChangeText={handleFormChange}
              value={form.collection}
            />
          </div>

          <div className="flex-grow mr-8">
            <TextInput
              label="Subject"
              labelId="subject"
              name="subject"
              placeholder="Enter the subject"
              onChangeText={handleFormChange}
              value={form.subject}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full text-2xl mb-10">
          <div className="w-[33%]">
            <TextInput
              label="Contributor"
              labelId="contributor"
              name="contributor"
              placeholder="Enter the contributors"
              onChangeText={handleFormChange}
              value={form.contributor}
            />
          </div>

          <div className="w-[33%]">
            <TextInput
              label="Lcsh"
              labelId="lcsh"
              name="lcsh"
              placeholder="Enter the lcsh"
              onChangeText={handleFormChange}
              value={form.lcsh}
            />
          </div>

          <div className="flex-grow mr-8">
            <TextInput
              label="Publisher"
              labelId="publisher"
              name="publisher"
              placeholder="Enter the publisher"
              onChangeText={handleFormChange}
              value={form.publisher}
            />
          </div>
        </div>

        <div className="flex justify-center flex-col">
          <div onClick={handleFormSubmit}>
            <FullWidthButton text="Search" />
          </div>
          {searchError && <ErrorText text={searchError} />}
        </div>
      </form>
    </>
  );
}

export default InputSection;
