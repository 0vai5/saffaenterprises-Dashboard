"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Printer } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ReactToPrint from "react-to-print";
import Link from "next/link";

type Bill = {
  invoiceID: string;
  DCNo: string;
  _id: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  InvoiceDate: string;
  PoNumber: string;
  DCDate: string;
  products: {
    description: string;
    unit: number;
    unitPrice: number;
    total: number;
  }[];
  grandTotal: number;
};

const Page = ({ params }: any) => {
  const [bill, setBill] = useState<Bill | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const fetchBillById = async () => {
    try {
      const response = await fetch("/api/bill/findBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id }),
      });

      if (!response.ok) {
        throw new Error("Error Occurred while Fetching Invoice");
      }
      const result = await response.json();
      setBill(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBillById();
  }, [params.id]);

  if (!bill) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="px-4 py-4">
        <Link href="/">
          <Image
            src={"/saffaenterprises.png"}
            alt="Company Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <section className="container mt-[3vh]">
        <div className="flex items-center justify-end mb-4 gap-3">
          <ReactToPrint
            trigger={() => (
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <Printer className="h-3.5 w-3.5" />
                <span className="not-sr-only">Print</span>
              </Button>
            )}
            content={() => cardRef.current}
          />
          <ReactToPrint
            trigger={() => (
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <ArrowDownToLine className="h-3.5 w-3.5" />
                <span className="not-sr-only">Downlaod</span>
              </Button>
            )}
            content={() => cardRef.current}
          />
        </div>
        <div ref={cardRef}>
          <Card className="dark:bg-transparent dark:border-[#27272A]">
            <CardHeader className="flex sm:flex-row flex-col justify-between sm:items-center items-start mb-[12rem] sm:mb-0 max-h-[20vh]">
              <Image
                src={"/saffaenterprises.png"}
                alt="company logo"
                width={150}
                height={75}
              />
              <div className="">
                <ul className="list-none flex justify-evenly flex-col ">
                  <li>
                    <span className="font-semibold">Tel#: </span>
                    +92(021)32400088
                  </li>
                  <li>
                    <span className="font-semibold">Email: </span>
                    saffaenterprises@gmail.com
                  </li>
                  <li>
                    <span className="font-semibold">Mobile#: </span>
                    +923343449019
                  </li>
                  <li>
                    <span className="font-semibold">Office: </span>Lotia Chamber
                    Aiwan-e-Tijarat Road, Karachi, Pakistan
                  </li>
                </ul>
              </div>
            </CardHeader>
            <CardContent className="mb-2 container">
              <CardTitle className="mb-3">
                Invoice# <span className="font-light">{bill.invoiceID}</span>
              </CardTitle>
              <div className="flex justify-between item-center mb-10 sm:flex-row flex-col gap-3 md:gap-0">
                <div className="flex flex-col">
                  <h1 className="text-base font-bold">Billed To:</h1>
                  <p>
                    <span className="font-semibold">Company Name:</span>{" "}
                    {bill.CompanyName}
                  </p>
                  <p>
                    <span className="font-semibold">Company Address:</span>{" "}
                    {bill.CompanyAddress}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>
                    <span className="font-semibold">P.O. No#: </span>{" "}
                    {bill.PoNumber}
                  </p>
                  <p>
                    <span className="font-semibold">InvoiceDate:</span>{" "}
                    {bill.InvoiceDate}
                  </p>
                  <p>
                    <span className="font-semibold">DCDate:</span> {bill.DCDate}
                  </p>
                  <p>
                    <span className="font-semibold">DCNo:</span> {bill.DCNo}
                  </p>
                </div>
              </div>

              <Card className="dark:bg-transparent dark:border-[#27272A] border-black/50">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Unit
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Unit Price
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bill.products.map((product, index) => (
                        <TableRow key={index} className="bg-accent">
                          <TableCell>
                            <div className="font-medium">
                              {product.description}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {product.unit}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Rs. {product.unitPrice}
                          </TableCell>
                          <TableCell className="text-right">
                            Rs. {product.unit * product.unitPrice}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-between items-end md:items-center px-5 sm:flex-row flex-col-reverse  gap-[4rem]">
              <div className="flex justify-end items-end flex-col gap-2">
                <Separator className="font-bold" />
                <p className="font-semibold">Waseem Haroon</p>
              </div>
              <div className="flex justify-end items-end flex-col gap-2">
                <p className="align-center">
                  <span className="font-bold">Total: </span>Rs.{" "}
                  {bill.grandTotal}
                </p>
                <Separator />
                <p>
                  <span className="font-bold">Grand Total: </span>Rs.{" "}
                  {bill.grandTotal}
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Page;
