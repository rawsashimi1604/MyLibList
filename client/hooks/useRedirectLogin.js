import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "./useLocalStorage";

function useRedirectLogin() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", null);

  // On component load do this...
  useEffect(() => {
    // If not logged in ... redirect to login page...
    if (!user) {
      router.push("/login");
    }
  }, []);
}

export default useRedirectLogin;
