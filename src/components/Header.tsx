import Link from "next/link";
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="header">
      <div>
      <Link
        href="/"
      >
        <img src="./saffaenterprises.png" alt="logo" className="h-32 w-32"/>
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