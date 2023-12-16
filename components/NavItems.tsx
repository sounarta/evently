"use client";

import { headerLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  const userId = useAuth();

  return (
    <ul className="flex w-full flex-col  items-center gap-10 max-sm:items-start lg:flex-row">
      {headerLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 0) ||
          pathname === item.route;

        if (item.route === "profile") {
          if (userId) {
            item.route = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }

        return (
          <li
            key={item.route}
            className={` cursor-pointer ${
              isActive
                ? " rounded-lg px-3 py-1 font-semibold text-blue-500 max-sm:w-full "
                : ""
            }`}
          >
            <Link href={item.route}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
