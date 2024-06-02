'use client'

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Invoice = {
  _id: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  OrganizationName: string;
  OrganizationTel: number;
  OrganizationAddress: string;
  InvoiceDate: string;
  PoNumber: number;
  DCNo: number;
  DCDate: string;
  products: {
    product: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  grandTotal: number;
};

const DashboardCards = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoice/findInvoices');
        if (!response.ok) {
          throw new Error('Error in fetching Invoices');
        }
        const data = await response.json();
        setInvoices(data.invoices);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, []);

  // Calculate the total grand total of all invoices
  const totalGrandTotal = invoices.reduce(
    (total, invoice) => total + invoice.grandTotal,
    0
  );

  return (
    <div className="flex justify-evenly items-center gap-5 md:flex-row flex-col w-full mb-10">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Your Invoice</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/createInvoice">
            <Button>Create New Invoice</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="w-full" x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Recent Invoices</CardDescription>
          <CardTitle className="text-4xl">Rs. {totalGrandTotal.toFixed(2)}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashboardCards;
