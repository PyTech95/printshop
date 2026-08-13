import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { useLenis } from "@/hooks/useLenis";
import { useSeoSettings } from "@/hooks/useSeoSettings";

export const Layout = () => {
  const { pathname } = useLocation();
  useLenis();
  useSeoSettings();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};
