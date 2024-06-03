'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const NavItems = () => {
  const router = useRouter();

  const LogoutHandler = async () => {
    try {
      const response = await fetch('/api/users/logout')
      if (response.ok) {
        router.push('/login')
        const result = await response.json();
        toast.success(result.message)
      } else {
        console.error('Logout failed: ', response.statusText)
      }
    } catch (error) {
      console.error('Error during logout: ', error)
    }
  }
  

  return (
    <>
    <ul className="flex flex-col md:flex-row gap-10 justify-between items-start md:items-center mt-10 md:mt-0">
      <li>
        <Link href="/">
          <h4 className="text-xl font-semibold">Dashboard</h4>
        </Link>
      </li>
      <li>
        <Link href="/createInvoice">
          <h4 className="text-xl font-semibold">Create Invoice</h4>
        </Link>
      </li>
      <li>
        <Link href="/search">
          <h4 className="text-xl font-semibold">Invoice Search</h4>
        </Link>
      </li>
      <li>
        <Link href="/users">
          <h4 className="text-xl font-semibold">Users</h4>
        </Link>
      </li>
      <li>
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1 text-sm"
          onClick={LogoutHandler}
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="not-sr-only">LogOut</span>
        </Button>
      </li>
    </ul>
    <Toaster
    position="top-right"
    reverseOrder={false}
  />
  </>
  );
};

export default NavItems;
