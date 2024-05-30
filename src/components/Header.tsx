import Link from "next/link";
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import Image from 'next/image'

const Header = () => {
  return (
    <header className="header">
      <div>
        <Link
          href="/"
        >
          <Image
            src={'/saffaenterprises.png'}
            alt="Company Logo"
            width={150}
            height={150}
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