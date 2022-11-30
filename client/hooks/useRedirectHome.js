import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "./useLocalStorage";

function useRedirectHome() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", null);

  // On component load do this...
  useEffect(() => {
    // If already logged in... can't access login page...
    if (user) {
      router.push("/");
    }
  }, []);
}

export default useRedirectHome;
