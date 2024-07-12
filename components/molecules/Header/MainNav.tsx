import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function MainNav() {
  return (
    <div className="mr-4 md:flex">
      <Link href="/" className="md:mr-6 flex items-center space-x-2">
        <span className="translate-y-[1px] text-lg font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}
