import React from "react";
import Link from "next/link";
import Logo from "../navbar/Logo";

function Footer() {
  //
  //   2101927	rawsashimi1604	Gavin Loo Wei Ren
  // 2101391	jianweiiii	Lim Jian Wei
  // 2100701	irfaan96	Irfaan
  // 2100614	junweilam	Jun Wei
  // Yong Chong
  // 2100764	ZafrullaKamil	Zafrulla
  const students = [
    { studentID: "2100614", name: "Lam Jun Wei", github: "junweilam" },
    {
      studentID: "2101927",
      name: "Gavin Loo Wei Ren",
      github: "rawsashimi1604",
    },
    { studentID: "2101391", name: "Lim Jian Wei", github: "jianweiiii" },
    { studentID: "2100701", name: "K M Irfaan Ahmed", github: "irfaan96" },
    { studentID: "2100711", name: "Lee Yong Chong", github: "2100711" },
    {
      studentID: "2100764",
      name: "Zafrulla Kamil Bin Saleem",
      github: "ZafrullaKamil",
    },
  ];

  return (
    <footer className="bg-gray-800 text-white w-full py-8 px-8 flex flex-col gap-6 items-center justify-center">
      <Logo />

      <div className="">
        <h1 className="mb-2 text-xs text-center">Please give high GPA prof</h1>
        <h2 className="mt-4 text-center tracking-wider text-3xl">
          An ICT2103 Project done by
        </h2>
        <div className="flex gap-3 mt-2 py-1">
          {students.map((student, i) => {
            return (
              <Link href={`https://github.com/${student.github}`}>
                <div
                  className={`
                  text-sm hover:text-white/80 
                  ${
                    i !== students.length - 1 &&
                    "border-r-[1px] border-cyan-900 pr-3 "
                  }  
                `}
                >
                  {student.name} ({student.studentID})
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
