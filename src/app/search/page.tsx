'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import {
  File,
  ListFilter,
  Trash,
  ArrowDownToLine,
  Pencil,
  EllipsisVerticalIcon
} from "lucide-react"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  Organization: string
  Date: Date
}

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <section className='max-container'>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>
            Search for Invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-evenly items-center gap-10'>
            <div>
              <form className='flex flex-col md:flex-row justify-between gap-10 items-center mb-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-start flex-col items-start'>
                  <Label>Search</Label>
                  <Input
                    type="text"
                    {...register('Organization', { required: true })}
                    placeholder='Invoice ID or Organisation'
                    className='border rounded-lg border-slate-400 px-3 py-1'
                  />

                  {errors.Organization && <p className="error">Organization is required</p>}
                </div>
                <div className='flex justify-start flex-col items-start'>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    {...register('Date')}
                    className='border rounded-lg border-slate-400 px-3 py-1' />
                </div>
                <div className='flex justify-start flex-col items-start'>
                  <Button className='relative top-1.5'>Search</Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <h1 className="subhead-text mb-5">Invoice History</h1>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Recent orders from your store.
          </CardDescription>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Declined
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Refunded
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-sm"
            >
              <File className="h-3.5 w-3.5" />
              <span className="not-sr-only">Export</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-accent">
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Sale</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">Fulfilled</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell><div className="ml-auto flex items-center gap-2">
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
                        >
                          <Trash className="h-3.5 w-3.5" />
                          <span className="not-sr-only">Delete</span>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 gap-1 text-sm"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="not-sr-only">Edit</span>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 gap-1 text-sm"
                        >
                          <ArrowDownToLine className="h-3.5 w-3.5" />
                          <span className="not-sr-only">Download</span>
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}

export default Search
