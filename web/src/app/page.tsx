import Image from "next/image";

import { Button } from "@/components/ui/button";
import { HeroSectionDemo } from "@/components/sections/landing/demo";
import { LinkButton } from "@/components/custom/link-button";

export default function Home() {

  return (<div className="w-screen min-h-screen flex items-center bg-black">
   
    <HeroSectionDemo/>
    </div>
    // <div className="flex items-center justify-center h-screen w-screen bg-black">
    //   <LinkButton variant="default" href="/login">Authentication</LinkButton>
    // </div>
  );
}
