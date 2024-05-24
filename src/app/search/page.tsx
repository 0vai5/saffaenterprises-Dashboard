import { DatePickerDemo } from '@/components/DatePicker'
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

const Search = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>Search</h1>
      <div className='flex justify-evenly items-center gap-10'>
        <div>
          <form className='flex flex-col md:flex-row justify-between gap-10 items-center mb-5'>
            <div className='flex justify-start flex-col items-start'>
              <label>Search</label>
              <input type="text" id="search" placeholder='Invoice ID or Organisation' className='border rounded-lg border-slate-400 px-3 py-1' />
            </div>
            <div className='flex justify-start flex-col items-start'>
              <label>Date</label>
              <DatePickerDemo />
            </div>
            <div className='flex justify-start flex-col items-start'>
              <Button className='relative top-3'>Search</Button>
            </div>
          </form>
        </div>
      </div>
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
                          variant="outline"
                          className="h-7 gap-1 text-sm"
                        >
                          <Trash className="h-3.5 w-3.5" />
                          <span className="not-sr-only">Delete</span>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          size="sm"
                          variant="outline"
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
