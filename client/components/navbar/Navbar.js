import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Logo from "./Logo";
import MenuItems from "./MenuItems";
import Notification from "./Notification";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="flex flex-row p-10 py-6 justify-between items-center bg-cyan-400 shadow-lg">
        <Link href="/">
          <Logo />
        </Link>

        {/* Right side */}
        <div className="flex flex-row items-center text-mono">
          {/* Menu items */}
          <MenuItems />

          {/* Notification */}
          <Notification />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
