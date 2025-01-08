"use client";

import { useState } from "react";
import { Header } from "@/components/ui/header";
import { SideBar } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <main className="h-full">
      <Header setOpen={setOpen} open={open} />
      <SideBar setOpen={setOpen} open={open} />
      {children}
    </main>
  );
}
