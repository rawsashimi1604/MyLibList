import React from "react";
import { AiFillLike } from "react-icons/ai";
import Button from "../common/buttons/Button";
import Link from "next/link";

function Book({ data }) {
  return (
    <Link href={`/book/${data.book_uuid}`}>
      <div className="bg-cyan-800 text-white px-4 py-4 rounded-xl mb-2 duration-150 ease-in trasition-all hover:translate-x-4 cursor-pointer w-[80%]">
        <div className="flex justify-between ">
          <div className="flex">
            {/* Title */}
            <div className="flex flex-col gap-2 pr-4 border-r border-cyan-100">
              <span className="text-xl">TITLE</span>
              <span className="font-bold text-ellipsis overflow-hidden min-w-[250px] max-w-[250px] whitespace-nowrap ">
                {data.title}
              </span>
            </div>

            {/* UUID */}
            <div className="flex flex-col gap-2 pl-4 pr-4 border-r border-cyan-100">
              <span className="text-xl">BOOK UUID</span>
              <span className="font-light text-ellipsis overflow-hidden min-w-[250px] max-w-[250px] whitespace-nowrap ">
                {data.book_uuid}
              </span>
            </div>

            {/* AUTHOR */}
            <div className="flex flex-col gap-2 pr-4 pl-4">
              <span className="text-xl">DATE CREATED</span>
              <span className="font-light text-ellipsis overflow-hidden min-w-[250px] max-w-[250px] whitespace-nowrap ">
                {data.date_created}
              </span>
            </div>
          </div>

          <div className="flex-grow flex items-center gap-5">
            {/* LIKES */}
            <div className="flex items-center gap-3 justify-end w-full">
              <span className="text-3xl">{data.likes}</span>
              <AiFillLike className="w-10 h-8" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Book;
