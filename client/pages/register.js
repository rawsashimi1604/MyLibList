import React, { useState, useEffect } from "react";
import UserService from "../requests/services/UserService";
import { useRouter } from "next/router";
import SubPageLayout from "../components/layout/SubPageLayout";
import Button from "../components/common/buttons/Button";
import TextInput from "../components/common/input/TextInput";
import Link from "next/link";
import SuccessModal from "../components/common/modals/SuccessModal";
import ErrorModal from "../components/common/modals/ErrorModal";

function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    acceptTermsAndConditions: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

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
    if (!formData.acceptTermsAndConditions) {
      setShowErrorModal(true);
      return;
    }

    // Submit the form... REGISTER USER using API route...
    try {
      const res = await UserService.registerUser(formData);
      console.log(res);
      setShowSuccessModal(true);
    } catch (err) {
      setShowErrorModal(true);
      return;
    }
  }

  return (
    <>
      {showSuccessModal && (
        <SuccessModal
          text="Register Successful"
          buttonText="Back to Login"
          buttonOnClick={() => {
            setShowSuccessModal(false);
            router.push("/login");
          }}
        />
      )}

      {showErrorModal && (
        <ErrorModal
          text="Register Fail"
          buttonText="Back to Login"
          buttonOnClick={() => {
            setShowErrorModal(false);
            router.push("/login");
          }}
        />
      )}
      <SubPageLayout>
        <a className="flex justify-center items-center flex-wrap text-gray-800"></a>
        <div className="bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
              Create Your Account
            </h1>
            <p className="text-lg">
              Register for an account here to access all book information.
            </p>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="mb-4 w-full">
                <TextInput
                  label="Email"
                  labelId="email"
                  placeholder="Enter your email"
                  name="email"
                  onChangeText={handleFormChange}
                  value={formData.email}
                />
              </div>
              <div>
                <TextInput
                  label="Password"
                  labelId="password"
                  name="password"
                  inputType="password"
                  placeholder="Enter your password"
                  onChangeText={handleFormChange}
                  value={formData.password}
                />
              </div>

              <div>
                <TextInput
                  label="First Name"
                  labelId="firstName"
                  name="first_name"
                  placeholder="Enter your first name"
                  onChangeText={handleFormChange}
                  value={formData.first_name}
                />
              </div>

              <div>
                <TextInput  
                  label="Last Name"
                  labelId="lastName"
                  name="last_name"
                  placeholder="Enter your last name"
                  onChangeText={handleFormChange}
                  value={formData.last_name}
                />
              </div>
              <div className="flex items-start pt-3">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    name="acceptTermsAndConditions"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    for="terms"
                    className="font-light text-gray-800 dark:text-gray-300"
                  >
                    I accept the Terms and Conditions
                  </label>
                </div>
              </div>

              <div
                className="text-center pt-1 pb-1"
                onClick={handleFormSubmission}
              >
                <Button text="Confirm" />
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </SubPageLayout>
    </>
  );
}

export default Register;
