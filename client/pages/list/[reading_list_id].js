import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useLocalStorage from "../../hooks/useLocalStorage";

import Header from "../../components/common/Header";
import Book from "../../components/readingList/Book"
import MainPageLayout from "../../components/layout/MainPageLayout";
import ReadingListService from "../../requests/services/ReadingListService";
import SuccessModal from "../../components/common/modals/SuccessModal";
import ErrorModal from "../../components/common/modals/ErrorModal";

function ReadingListPage() {
  const router = useRouter();
  const { reading_list_id } = router.query;

  // States
  const [readingList, setReadingList] = useState(null)
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);

  async function handleDeleteBookFromReadingList(book_uuid) {
    try {
      console.log(
        { 
          reading_list_id : reading_list_id, 
          book_uuid: book_uuid,
          email: user.data.email, 
        }
      )
      const res = await ReadingListService.deleteBookFromReadingList(
        { 
          reading_list_id : reading_list_id, 
          book_uuid: book_uuid,
          email: user.data.email, 
        }
      )

      console.log(res)
      setShowSuccessModal(true);
    
    } catch (err) {
      console.log(err)
      setShowErrorModal(true);
    }
  }

  // On load get reading list books
  useEffect(() => {
    if (reading_list_id) {
      getReadingListBooks()
    }
  }, [reading_list_id, ])

  async function getReadingListBooks() {
    try {
      const res = await ReadingListService.getReadingList(reading_list_id);
      console.log(res);
      setReadingList(res.data);
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <MainPageLayout>
      {showErrorModal && (
          <ErrorModal
            text="Delete Fail"
            buttonText="Back"
            buttonOnClick={() => {
              setShowErrorModal(false);
            }}
          />
        )}

        {showSuccessModal && (
          <SuccessModal
            text="Delete Successful"
            buttonText="Back To Home"
            buttonOnClick={() => {
              setShowSuccessModal(false)
              router.push("/")
            }}
          />
        )}
      <Header text={readingList?.reading_list.reading_list_id + " - " + readingList?.reading_list.name} />

      <h3 className="font-bold text-xl mb-5">Total books: {readingList?.books.length}</h3>
      {/* Reading list books */}
      <section>
        {readingList?.books.length > 0 && 
          readingList?.books.map((book, i) => {
            return (
              <div>
                <Book 
                  key={i} 
                  data={book} 
                  handleDeleteBookFromReadingList={handleDeleteBookFromReadingList} 
                  isOwner={user.data.email === readingList.reading_list.email}
                />
              </div>
            )
          })
        }
      </section>
    </MainPageLayout>
  )
}


export default ReadingListPage