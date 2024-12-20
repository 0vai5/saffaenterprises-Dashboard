import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "./NavItems";
import {
  Menu
} from "lucide-react"
import Link from "next/link";
import Image from "next/image"


const MobileNav = () => {
  return (
    <section className="lg:hidden md:block sm:block">
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-10 h-5 flex items-center justify-center">
            <Menu className="font-lg dark:text-white text-dark " />
          </button>
        </SheetTrigger>
        <SheetContent className="bg-white drop-shadow-[-100px 0px 30px -10px rgba(0,0,0,0.1)]">
          <div>
            <Link href="/">
              <Image
                src={'/saffaenterprises.png'}
                alt="Company Logo"
                width={150}
                height={100}
                className="dark:hidden"
              />
              <Image
                src={'/saffaenterprises-dark.png'}
                alt="Company Logo"
                width={150}
                height={100}
                className="hidden dark:block"
              />
            </Link>
          </div>
          <NavItems />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
