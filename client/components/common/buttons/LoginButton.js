import React from "react";

function LoginButton() {
  return (
    <button
      className="bg-cyan-900 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-md hover:shadow-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
    >
      Log in
    </button>
  );
}

export default LoginButton;
