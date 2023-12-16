import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
const Navbar = () => {
  return (
    <nav className=" w-full border-b">
      <div className=" wrapper flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt=""
            height={38}
            width={128}
            className=" object-contain"
          />
        </Link>
        <div className=" max-lg:hidden">
          <NavItems />
        </div>
        <div className=" flex w-32 items-center justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{
                elements:{
                    avatarBox:'w-[30px] h-[30px]'
                }
            }} />
            <div className="hidden max-lg:flex">
            <MobileNav />
            </div>
           
          </SignedIn>
          <SignedOut>
            <Button size="lg" asChild className=" rounded-full">
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
