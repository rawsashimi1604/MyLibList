import React, { useState, useEffect } from "react";
import AuthService from "../../requests/services/AuthService";
import { useRouter } from "next/router";
import Link from "next/link";

import SuccessModal from "../common/modals/SuccessModal";
import ErrorModal from "../common/modals/ErrorModal";
import Logo from "../navbar/Logo";
import Button from "../common/buttons/Button";
import LoginButton from "../common/buttons/LoginButton";
import TextInput from "../common/input/TextInput";
import useLocalStorage from "../../hooks/useLocalStorage";

function LeftSection() {
  // Hooks
  const router = useRouter();

  // TODO JWT LOGIN...

  // States
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // const [loginData, setLoginData] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);

  // Functions
  function handleFormChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLoginForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: value,
      };
    });
  }

  // Handle form submit
  async function handleLoginFormSubmit(e) {
    // Prevent default behaviours
    e.preventDefault();

    console.log(loginForm);
    try {
      const res = await AuthService.login(loginForm);
      console.log(res);
      setUser(res.data);
      setShowSuccessModal(true);
    } catch (err) {
      setShowErrorModal(true);
    }
  }

  return (
    <>
      {showErrorModal && (
        <ErrorModal
          text="Login Fail"
          buttonText="Back"
          buttonOnClick={() => {
            setShowErrorModal(false);
            router.push("/login");
          }}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          text="Login Successful"
          buttonText="Go to Home"
          buttonOnClick={() => {
            setShowSuccessModal(false);
            router.push("/");
          }}
        />
      )}

      <div className="lg:w-6/12 px-8 md:px-0">
        <div className="md:p-12 md:mx-6">
          <div className="flex justify-center items-center mb-7">
            <Logo />
          </div>
          <form>
            <p className="mb-6 font-semibold text-center">
              Enter your account details below
            </p>

            {/* Email */}
            <div className="mb-4 w-full">
              <TextInput
                label="Email:"
                labelId="email"
                name="email"
                placeholder="Enter your email"
                onChangeText={handleFormChange}
                value={loginForm.email}
              />
            </div>

            {/* Password */}
            <div className="mb-4 w-full">
              <TextInput
                label="Password:"
                labelId="password"
                name="password"
                placeholder="Enter your password"
                inputType="password"
                onChangeText={handleFormChange}
                value={loginForm.password}
              />
            </div>

            <div class="flex items-center justify-between pb-6">
              <p class="mb-0 mr-2">Don't have an account?</p>

              <Link href="/register">
                <div className="text-center pt-1 pb-1">
                  <Button text="Register" />
                </div>
              </Link>
            </div>

            {/* LoginButton */}
            <div
              className="text-center pt-1 pb-1"
              onClick={handleLoginFormSubmit}
            >
              <LoginButton />
            </div>
            <div className="flex items-center justify-between pb-6"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LeftSection;
