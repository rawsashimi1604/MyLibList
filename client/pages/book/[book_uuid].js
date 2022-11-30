import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import MainPageLayout from "../../components/layout/MainPageLayout";
import SelectInput from "../../components/common/input/SelectInput"
import BookService from "../../requests/services/BookService";
import ReadingListService from "../../requests/services/ReadingListService"
import Button from "../../components/common/buttons/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import ErrorText from "../../components/common/ErrorText";
import UserService from "../../requests/services/UserService";
import ErrorModal from "../../components/common/modals/ErrorModal"
import SuccessModal from "../../components/common/modals/SuccessModal"


function BookPage() {
  // Hooks
  const router = useRouter();
  const { book_uuid } = router.query;

  // States
  const [user, setUser] = useLocalStorage("user", null);
  const [book, setBook] = useState(null);
  const [likeBookError, setLikeBookError] = useState(null);
  const [isBookLiked, setIsBookLiked] = useState(false);
  const [readingListSelect, setReadingListSelect] = useState(null)
  const [readingLists, setReadingLists] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Get all reading lists owned
  // ReadingList ID
  // BookUUID
  // Email

  // UseEffects
  useEffect(() => {
    if (book_uuid) {
      getBook();
      getUserReadingLists();
    }
  }, [book_uuid, isBookLiked]);

  useEffect(() => {
    console.log(readingListSelect)
  }, [readingListSelect])

  useEffect(() => {
    console.log(book)
  }, [book])

  // Functions
  async function getBook() {
    const res = await BookService.getBookByUUID(book_uuid);
    console.log(res);
    setBook(res.data.data[0]);

    const likedBooksRes = await UserService.getAllLikedBooks({
      email: user.data.email,
    });
    let setBookFlag = false;
    for (const book of likedBooksRes.data.data) {
      if (book_uuid === book.book_uuid) {
        setIsBookLiked(true);
        setBookFlag = true;
        break;
      }
    }
    if (!setBookFlag) {
      setIsBookLiked(false);
    }
  }

  // 
  async function getUserReadingLists() {
    const res = await UserService.getAllReadingLists({
      email: user.data.email
    })
    setReadingLists(res.data.data)
  }

  async function handleLikeBook() {
    try {
      const res = await BookService.addLikeToBook({
        email: user.data.email,
        book_uuid: book_uuid,
      });
      // update state again after checking book is liked
      getBook();
      console.log(res);
    } catch (err) {
      console.log(err);
      setLikeBookError(err.response.data);
    }
  }

  async function handleAddBookToReadingList() {
    if (!readingListSelect) {
      console.log("No reading List selected")
      setShowErrorModal(true)
      return;
    }
    try {
      const res = await ReadingListService.addBookToReadingList({
        reading_list_id: readingListSelect.split("-")[0],
        book_uuid: book.book_uuid,
        email: user.data.email
      });
      console.log(res);
      setShowSuccessModal(true)
    } catch (err) {
      setShowErrorModal(true)
      console.log(err);
    }
    
  }

  return (
    <div className="">
      {showSuccessModal && (
        <SuccessModal
          text="Add to Reading List Successful"
          buttonText="Back"
          buttonOnClick={() => {
            setShowSuccessModal(false);
          }}
        />
      )}

      {showErrorModal && (
        <ErrorModal
          text="Add to Reading List Fail"
          buttonText="Back"
          buttonOnClick={() => {
            setShowErrorModal(false);
          }}
        />
      )}

      <MainPageLayout>

        <div className="border border-black">
            {book?.collections.map((collection, i) => {
              return <div className="inline-block underline hover:cursor-pointer hover:text-blue-700" key={i}>{collection} | </div>;
            })}
        </div>

        <div className="flex justify-between">
        <div className="w-[60%]">
          <div>
            <h3 className="font-bold text-4xl pt-10 border-b border-gray-500 pb-2">{book?.title}</h3>
          </div>
          <div className="pt-10 pb-10 border-b-[2px] border-gray-600">
            <ul className="inline-block">
              <li className="inline-block text-xl font-bold">  Contributors:        
                  {book?.contributors.map((contributor, i) => {
              return (
                <div key={i} className="inline-block text-lg font-normal pl-3">
                  {contributor.contributor_type}: {contributor.contributor} |
                </div>
              );
            })}</li>
            <li className="text-xl font-bold"> Languages: 
              {book?.languages.map((language, i) => {
                return <div key={i} className="inline-block text-lg font-normal pl-3"> {language} |</div>;
              })}
            </li>
            <li className="text-xl font-bold"> Subjects: 
              {book?.subjects.map((subject, i) => {
                return <div key={i} className="inline-block text-lg font-normal pl-3">{subject} |</div>;
              })}
            </li>
            <li className="text-xl font-bold"> LCSH: 
              {book?.lcsh.map((lcsh, i) => {
                return <div key={i} className="inline-block text-lg font-normal pl-3">{lcsh} |</div>;
              })}
            </li>
            <li className="text-xl font-bold"> Publishers: 
              {book?.publishers.map((publisher, i) => {
                return <div key={i} className="inline-block text-lg font-normal pl-3">{publisher}</div>;
              })}
            </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <span>{book?.abstract}</span>
            </div>

            <div className="">
              <span>{book?.description}</span>
            </div>
            
            {
              book?.alternative_titles.length > 0 &&
              <div>
                <h3 className="font-bold text-lg"> Alternative Titles:</h3>
                <span> {book?.alternative_titles.map((altTitle, i) => {
                  return <div key={i}>{altTitle}</div>;
                })}</span>
              </div>
            }
            

          <div>
            <h3 className="font-bold text-lg">Book UUID: </h3>
            <span>{book?.book_uuid}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Date Created: </h3>
            <span>{book?.date_created}</span>
          </div>

          <div>
            <h3 className="font-bold text-lg">URI: </h3>
            <span>{book?.uri}</span>
          </div>
        </div>
        </div>
        
        {/* RIGHT */}
        <div className="mr-10 mt-10 border border-black pl-10 pt-10 pr-10 pb-10 rounded-md shadow-md shadow-black">
          <img src = {`https://eservice.nlb.gov.sg/bookcoverwrapper/cover/${book?.book_uuid}?s=MD&type=UUID`} className="w-96"/>
          <h3 className="font-bold text-center pt-4 text-xl">{book?.likes} Likes</h3>
          <div onClick={handleLikeBook} className="text-center pt-2">
          {isBookLiked ? (
            <div className="inline-flex gap-4">
              <AiFillLike className="w-10 h-8 border border-cyan-500 cursor-pointer hover:w-12 hover:h-9 bg-cyan-500 rounded-md fill-green-500" />
              <AiFillDislike className="w-10 h-8 border border-cyan-500 cursor-pointer hover:w-12 hover:h-9 fill-gray-100 rounded-md bg-cyan-500 hover:fill-red-600" />
            </div>
          ) : (
            <div className="inline-flex gap-4">
            <AiFillLike className="w-10 h-8 border border-cyan-500 cursor-pointer hover:w-12 hover:h-9 bg-cyan-500 fill-gray-100 rounded-md hover:fill-green-500" />
            <AiFillDislike className="w-10 h-8 border border-cyan-500 cursor-pointer hover:w-12 hover:h-9 rounded-md bg-cyan-500 fill-gray-100" />
            </div>
          )}

          {likeBookError && <ErrorText text={likeBookError} />}
          </div>
          
          <div className="inline-flex">
            {/* Only set ID  */}
            <SelectInput 
              value={readingListSelect}
              onChangeOption={(e) => setReadingListSelect(e.target.value)}
              // label="Reading List"
              labelId="readingList"
              name="readingList"
              options={readingLists.map((readingList) => {
                return `${readingList.reading_list_id}-${readingList.name}`
              })}
            />
          <span onClick={handleAddBookToReadingList} className="pl-5 mt-5">
            <Button text="Add List"></Button>
          </span>
        </div>
          
          <div className="pt-10 text-center">
            <a href={`https://eservice.nlb.gov.sg/data2/BookSG/publish/${book?.book_uuid.charAt(0)}/${book?.book_uuid}/web/html5/index.html?opf=tablet/BOOKSG.xml&launchlogo=tablet/BOOKSG_BrandingLogo_.png`} target="_blank"><Button text="Read Now"></Button></a>
          </div>
        </div>
  </div>
      </MainPageLayout>
    </div>
  );
}

export default BookPage;