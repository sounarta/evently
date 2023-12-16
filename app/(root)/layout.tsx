import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-screen flex-col">
      <Navbar />
      <section className=" flex-1">{children}</section>
      <Footer />
    </div>
  );
};

export default Layout;
