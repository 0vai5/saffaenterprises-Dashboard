import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "./NavItems";
import {
  Menu
} from "lucide-react"
import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image"
=======
import Image from "next/Image"
>>>>>>> dce1e2a96dde3a26b8d206cbaeb424eeb7fa1535


const MobileNav = () => {
  return (
    <section className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-10 h-5 flex items-center justify-center">
            <Menu className="font-lg text-black " />
          </button>
        </SheetTrigger>
        <SheetContent className="bg-white drop-shadow-[-100px 0px 30px -10px rgba(0,0,0,0.1)]">
          <div>
            <Link href="/">
<<<<<<< HEAD
              <Image
                src={'/saffaenterprises.png'}
                alt="Company Logo"
                width={150}
                height={100}
              />
=======
                <Image src="/saffaenterprises.png" alt="logo" className="h-32 w-32" />
>>>>>>> dce1e2a96dde3a26b8d206cbaeb424eeb7fa1535
            </Link>
          </div>
          <NavItems />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
