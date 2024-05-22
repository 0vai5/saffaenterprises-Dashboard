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
import Link from "next/link";

const DashboardCards = () => {
  return (
    <div className="flex justify-between items-center gap-5 md:flex-row flex-col w-full mb-10">
      <Card className="sm:col-span-2 w-full" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Your Orders</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
            <Link href='/invoice'>
          <Button>Create New Order</Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="w-full" x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">$1,329</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +25% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={25} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card className="w-full" x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">$5,329</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
      </div>
  )
}

export default DashboardCards