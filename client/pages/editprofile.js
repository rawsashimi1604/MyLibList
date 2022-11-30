import React from "react";
import MainPageLayout from "../components/layout/MainPageLayout";
import TextInput from "../components/common/input/TextInput";
import { useState } from "react";
import Button from "../components/common/buttons/Button";
import Router, { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import ErrorModal from "../components/common/modals/ErrorModal";
import SuccessModal from "../components/common/modals/SuccessModal";
import UserService from "../requests/services/UserService";

function EditProfile() {
  const router = useRouter();

  const [editForm, setEditForm] = useState({
    password: "",
    newPassword: "",
  });

  const [user, setUser] = useLocalStorage("user", null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  function handleFormChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: value,
      };
    });
  }

  async function handleEditFormSubmit(e){
    e.preventDefault();
    if(!(editForm.password === editForm.newPassword)){
      
      return;
    }
    const newPasswordObject = {
      email: user.data.email,
      password: editForm.password
    }

    try{
      const res = await UserService.changeUserPassword(newPasswordObject);
      setShowSuccessModal(true);
    }catch (err){
      setShowErrorModal(true);
    }
    
  }

  return (
    <>

        {showErrorModal && (
          <ErrorModal
            text="Change password Fail"
            buttonText="Back"
            buttonOnClick={() => {
              setShowErrorModal(false);
            }}
          />
        )}

        {showSuccessModal && (
          <SuccessModal
            text="Change password Successful"
            buttonText="Go to Home"
            buttonOnClick={() => {
              setShowSuccessModal(false);
              router.push("/");
            }}
          />
        )}

      <MainPageLayout>
        <section className="h-full gradient-form  lg:h-screen">
          <div className="mx-24 py-12 px-6 h-full">
            <a className="flex justify-center items-center flex-wrap text-gray-800"></a>
            <div className="bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Change Your Password
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <TextInput
                      label="New Password"
                      labelId="newpassword"
                      name="password"
                      placeholder="Enter your New password"
                      inputType="password"
                      onChangeText={handleFormChange}
                      value={editForm.password}
                    />
                  </div>
                  <div>
                    <TextInput
                      label=" Confirm New Password"
                      labelId="confirmNewPassword"
                      name="newPassword"
                      placeholder="Enter your new password again"
                      inputType="password"
                      onChangeText={handleFormChange}
                      value={editForm.newPassword}
                    />
                  </div>

                  <div className="text-center pt-1 pb-1" onClick={handleEditFormSubmit}>
                    <Button text="Update Password" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </MainPageLayout>
    </>
  );
}

export default EditProfile;
