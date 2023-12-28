import MainContainer from "@/components/MainContainer";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <MainContainer />
    </main>
  );
}
