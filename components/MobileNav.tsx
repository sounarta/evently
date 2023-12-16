import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={"/assets/icons/menu.svg"}
          alt=""
          width={25}
          height={25}
          className=" cursor-pointer object-contain"
        />
      </SheetTrigger>
      <SheetContent className=" flex flex-col gap-6">
        <Image
          src={"/assets/images/logo.svg"}
          alt=""
          width={125}
          height={35}
          className=" cursor-pointer object-contain"
        />
        <hr />
        <NavItems/>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
