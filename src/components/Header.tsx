import Link from "next/link";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import UserDropdown from "./UserDropdown";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header">
      <div>
        <Link href="/">
          <Image
            src={"/saffaenterprises.png"}
            alt="Company Logo"
            width={150}
            height={150}
            className="cursor-pointer dark:hidden"
          />
        </Link>
        <Link href="/">
          <Image
            src={"/saffaenterprises-dark.png"}
            alt="Company Logo"
            width={150}
            height={150}
            className="cursor-pointer hidden dark:block"
          />
        </Link>
      </div>
      <nav className="sm:hidden lg:block md:hidden">
        <NavItems />
      </nav>
      <div className="flex justify-center flex-row-reverse items-center gap-3">
      <MobileNav />
      <UserDropdown />
      </div>
    </header>
  );
};

export default Header;


