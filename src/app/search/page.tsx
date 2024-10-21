"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, EllipsisVerticalIcon, Eye, CirclePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Header from "@/components/Header";
import { SearchDelivery, SearchInput } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/Loader";

const Search = () => {
  const [data, setData] = useState<SearchDelivery[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchInput>();

  const onSubmit: SubmitHandler<SearchInput> = async (data) => {
    setError(null); // Reset error state
    setLoading(true);
    try {
      const response = await fetch("/api/delivery/searchDelivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log("An error occured");
      }

      const result = await response.json();
      setData(result.data);
      setLoading(false);
      toast.success(result.message);
    } catch (error: any) {
      console.error("An error occurred while fetching data:", error);
      toast.error(error);
      setLoading(false);
    }
  };

  const deleteInvoice = async (_id: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/challan/deleteDelivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id }),
      });

      if (response.ok) {
        setData((prevChallan) =>
          prevChallan.filter((challan) => challan._id !== _id)
        );
        toast.success("Delivery deleted successfully");
      } else {
        toast.error("Failed to delete Delivery");
      }
      setLoading(false);
    } catch (error) {
      console.log(`Failed to delete Challan with ID ${_id}`, error);
      toast.error("Failed to delete Challan");
      setLoading(false);
    }
  };

  const searchQuery = watch("searchQuery");

  useEffect(() => {
    let timeOutID: ReturnType<typeof setTimeout>;

    if (searchQuery) {
      timeOutID = setTimeout(() => {
        onSubmit({ searchQuery });
      }, 1000);
    }

    return () => clearTimeout(timeOutID);
  }, [searchQuery]);

  return (
    <>
      <Header />
      {loading && <Loader />}
        <section className="max-container">
          <Toaster position="top-right" reverseOrder={false} />
          <Card className="mb-4 dark:bg-transparent dark:border-[#27272A]">
            <CardHeader>
              <CardTitle>Search</CardTitle>
              <CardDescription>Search for Challans</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col md:flex-row justify-between gap-10 items-center mb-5">
                <div className="flex justify-start flex-col items-start w-full">
                  <Label>Search</Label>
                  <Input
                    type="text"
                    {...register("searchQuery", { required: true })}
                    placeholder="Search by Serial No., Company, Client, etc."
                    className="border rounded-lg border-slate-400 px-3 py-1 w-full"
                  />
                  {errors.searchQuery && (
                    <p className="error">Search query is required</p>
                  )}
                </div>
              </form>
              {error && <p className="error">{error}</p>}
            </CardContent>
          </Card>
          <div className="flex items-center justify-between ">
            <h1 className="subhead-text mb-5">Delivery History</h1>
          </div>
          <div>
            <Card className="dark:bg-transparent dark:border-[#27272A]">
              <CardHeader className="px-7">
                <CardTitle>Delivery</CardTitle>
                <CardDescription>Recent Deliveries registered.</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Delivery Date
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data && data.length > 0 ? (
                        data.map((data, index) => (
                          <TableRow key={index} className="bg-accent">
                            <TableCell>
                              <div className="font-medium">
                                <p>{data.CompanyName}</p>
                                <p>{data.ClientEmail}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {data.status === true ? (
                                  <Badge variant={"success"}>Billed</Badge>
                                ) : (
                                  <Badge variant={"danger"}>Not Billed</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {data.DCDate}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="ml-auto flex items-center justify-center gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 gap-1 text-sm"
                                    >
                                      <EllipsisVerticalIcon className="h-3.5 w-3.5" />
                                      <span className="not-sr-only">More</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>More</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        className="h-7 gap-1 text-sm"
                                        onClick={() => deleteInvoice(data._id)}
                                      >
                                        <Trash className="h-3.5 w-3.5" />
                                        <span className="not-sr-only">
                                          Delete
                                        </span>
                                      </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Link href={"/delivery/" + data._id}>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-7 gap-1 text-sm"
                                        >
                                          <Eye className="h-3.5 w-3.5" />
                                          <span className="not-sr-only">
                                            View DC
                                          </span>
                                        </Button>
                                      </Link>
                                      {data.status === true ? (
                                        <Link href={"/bill/" + data.BillRef}>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 gap-1 text-sm"
                                          >
                                            <Eye className="h-3.5 w-3.5" />
                                            <span className="not-sr-only">
                                              View Bill
                                            </span>
                                          </Button>
                                        </Link>
                                      ) : (
                                        <Link href={"/create-bill/"}>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 gap-1 text-sm"
                                          >
                                            <CirclePlus className="h-3.5 w-3.5" />
                                            <span className="not-sr-only">
                                              Create Bill
                                            </span>
                                          </Button>
                                        </Link>
                                      )}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No invoices found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
    </>
  );
};

export default Search;
