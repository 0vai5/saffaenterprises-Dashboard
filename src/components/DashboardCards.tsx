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


const DashboardCards = () => {
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
    </div>
  );
};

export default DashboardCards;
