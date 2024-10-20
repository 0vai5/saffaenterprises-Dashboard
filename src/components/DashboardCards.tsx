'use client'

import React from "react";
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

const DashboardCards = () => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="dark:bg-transparent dark:border-[#27272A]" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>New Delivery</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
          Create a new delivery challan to document your shipments and provide clear records for customers. Ensure smooth communication and keep track of deliveries with ease.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/create-delivery">
            <Button>Create New Delivery</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="dark:bg-transparent dark:border-[#27272A]" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>New Bill</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
          Generate a new bill for your customers to accurately record transactions and payments. Keep your invoicing process simple and organized for easy tracking and management
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/create-bill">
            <Button>Create New Bill</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardCards;
