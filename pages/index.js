import MainContainer from "@/components/MainContainer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <MainContainer />
    </main>
  );
}
