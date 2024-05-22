'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

const NavItems = () => {
  const router = useRouter();

  return (
    <ul className="flex flex-col md:flex-row gap-10 justify-between items-start md:items-center mt-10 md:mt-0">
      <li>
        <Link href="/">
            <h4 className="text-xl font-semibold">Dashboard</h4>
        </Link>
      </li>
      <li>
        <Link href="/invoice">
            <h4 className="text-xl font-semibold">Invoice</h4>
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
    </ul>
  );
};

export default NavItems;
