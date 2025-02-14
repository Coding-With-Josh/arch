import Image from "next/image";

import { Button } from "@/components/ui/button";
import { HeroSectionDemo } from "@/components/sections/landing/demo";
import { LinkButton } from "@/components/custom/link-button";
import Navbar from "@/components/sections/navbar/default";
import { CreateOrganization, UserButton } from "@clerk/nextjs";


export default function Home() {

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-zinc-950">
          <Navbar/>
    <HeroSectionDemo/>
    {/* <CreateOrganization /> */}

    </div>
    // <div className="flex items-center justify-center h-screen w-screen bg-black">
    //   <LinkButton variant="default" href="/login">Authentication</LinkButton>
    // </div>
  );
}
