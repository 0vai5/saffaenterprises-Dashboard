import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "./NavItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const MobileNav = () => {
  return (
    <section className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-10 h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faBars} className="font-bold text-lg text-black" />
          </button>
        </SheetTrigger>
        <SheetContent className="bg-white drop-shadow-[-100px 0px 30px -10px rgba(0,0,0,0.1)]">
          <div>
            <Link href="/">
                <img src="/saffaenterprises.png" alt="logo" className="h-32 w-32" />
            </Link>
          </div>
          <NavItems />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
