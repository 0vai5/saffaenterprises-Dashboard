"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import ThemeButton from "./ThemeButton";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function UserDropdown() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const router = useRouter();

  const LogoutHandler = async () => {
    try {
      const response = await fetch("/api/users/logout");
      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        router.push("/login");
      } else {
        console.error("Logout failed: ", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="/user.png" className="cursor-pointer" />
          <AvatarFallback className="cursor-pointer">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="">
          <ThemeButton />
        </div>
        <div className="p-3">
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm"
            onClick={LogoutHandler}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="not-sr-only">LogOut</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
