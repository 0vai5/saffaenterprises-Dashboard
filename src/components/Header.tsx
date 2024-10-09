import Link from "next/link";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
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
      <nav className="hidden md:block">
        <NavItems />
      </nav>
      <MobileNav />
    </header>
  );
};

export default Header;


