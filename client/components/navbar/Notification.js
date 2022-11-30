import React, { useState } from "react";

import { CgProfile } from "react-icons/cg";
import ProfilePopup from "./ProfilePopup";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <div className="">
        <div
          className=""
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <CgProfile className="h-8 w-8 cursor-pointer scale-100 hover:scale-110 ease-in duration-150 text-cyan-800" />
        </div>
        {isOpen && <ProfilePopup />}
      </div>
    </div>
  );
}

export default Notification;
