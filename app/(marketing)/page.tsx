import Image from "next/image";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";
import Navbar from "./_components/navbar";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between text-left gap-y-8 flex-1 px-6 pb-10 md:px-12 pt-12 md:pt-20 ">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;
