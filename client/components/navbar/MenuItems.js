import React from "react";
import Link from "next/link";

function MenuItems() {
  const menuItems = [
    { label: "BOOKS", link: "/book" },
    { label: "READING LISTS", link: "/list" },
    { label: "LIKED BOOKS", link: "/favourite" },
    { label: "SEARCH", link: "/search" },
  ];

  return (
    <div className="flex flex-row gap-x-4 px-4 py-2 bg-cyan-500 text-gray-50 rounded-lg shadow-md shadow-cyan-300 mr-6">
      {menuItems.map((menuItem, i) => {
        return (
          <div
            key={i}
            className={`
            ${i !== menuItems.length - 1 && "border-r-[1px] pr-4 "} 
            duration-150 transition-all hover:text-gray-300 ease-in
          `}
          >
            <Link href={menuItem.link}>
              <div className="">{menuItem.label}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MenuItems;
