"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import airbnbIcon from "public/images/airbnb-icon.webp";
import airbnbLogo from "public/images/airbnb-logo.webp";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <Image
        onClick={() => router.push("/")}
        src={airbnbLogo}
        width={80}
        alt="airbnb-logo"
        className="hidden cursor-pointer md:block"
        priority
      />
      <Image
        onClick={() => router.push("/")}
        src={airbnbIcon}
        width={25}
        alt="airbnb-icon"
        className="cursor-pointer md:hidden"
        priority
      />
    </>
  );
};

export default Logo;
