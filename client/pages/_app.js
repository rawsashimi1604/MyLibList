import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import "animate.css";

import { Beforeunload } from "react-beforeunload";

const removeApplicationData = () => {
  if (window) {
    // NextJS is ServerSideRendering, therefore the window-check.
    localStorage.clear();
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <Beforeunload onBeforeunload={removeApplicationData}>
      <RecoilRoot>
        <div className="max-w-screen font-Montserrat">
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </Beforeunload>
  );
}

export default MyApp;
