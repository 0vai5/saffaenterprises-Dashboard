"use client";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavItems = () => {
  return (
    <>
      <ul className="flex flex-col md:flex-row gap-10 justify-between items-start md:items-center mt-10 md:mt-0">
        <li>
          <Link href="/">
            <h4 className="text-xl font-semibold">Dashboard</h4>
          </Link>
        </li>
        <NavigationMenu>
          <NavigationMenuList className="bg-transparent">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl font-semibold">
                Create
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-5 text-lg">
                <NavigationMenuLink href="/create-bill" className="mb-10">
                  CreateBill
                </NavigationMenuLink>
                <br />
                <NavigationMenuLink href="/create-delivery">
                  CreateDelivery
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <li>
          <Link href="/search">
            <h4 className="text-xl font-semibold">Search</h4>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <h4 className="text-xl font-semibold">Users</h4>
          </Link>
        </li>
      </ul>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default NavItems;
