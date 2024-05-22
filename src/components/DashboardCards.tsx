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
import { Progress } from "@/components/ui/progress";
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
          <Link href="/invoice">
            <Button>Create New Invoice</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="" x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Upcoming Payments</CardDescription>
          <CardTitle className="text-4xl">$250</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-accent">
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      pending
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-06-23
                  </TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
