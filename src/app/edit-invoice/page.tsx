import { DatePickerDemo } from '@/components/DatePicker'
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
  CardContent
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

// TODO: input logic, react Hook Form and the save logic the item addition Logic etxc is left and including react hook form

const page = () => {
  return (
    <section className='max-container'>
      <h1 className='subhead-text mb-10'>Clients Information</h1>
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 mb-5'>
        <div className='flex justify-start flex-col items-start'>
          <label>Client No:</label>
          <input type="number" id="phNum" placeholder='Enter Phone Number' className='border rounded-lg border-slate-400 px-3 py-1' />
        </div>
        <div className='flex justify-start flex-col items-start'>
          <label>Client Email:</label>
          <input type="email" id="email" placeholder='Enter email' className=' border-slate-400 border rounded-lg px-3 py-1' />
        </div>
        <div className='flex justify-start flex-col items-start'>
          <label>Organization:</label>
          <input type="text" id="OrgName" placeholder='Enter Organization Name' className='border rounded-lg border-slate-400 px-3 py-1' />
        </div>
        <div className='flex justify-start flex-col items-start'>
          <label>Organization Tel. No.:</label>
          <input type="number" id="OrgTelephoneNo" placeholder="Enter Organization's telephone Number" className='border border-slate-400 rounded-lg px-3 py-1' />
        </div>
      </div>
      <h1 className='subhead-text mb-10'>Invoice Details</h1>
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 mb-5'>
        <div className='flex justify-start flex-col items-start'>
          <label>Invoice Date</label>
          <DatePickerDemo />
        </div>
        <div className='flex justify-start flex-col items-start'>
          <label>DC. Number: </label>
          <input type="number" placeholder='Enter Number' className='border border-slate-400 rounded-lg px-3 py-1' />
        </div>
        <div className='flex justify-start flex-col items-start'>
          <label>DC. Date: </label>
          <DatePickerDemo />
        </div>
      </div>
      <h1 className='subhead-text mb-10'>Product Information</h1>
      <div className='mb-10'>
  <Card x-chunk="dashboard-05-chunk-3">
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">
              Product
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              Unit Price
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Quantity
            </TableHead>
            <TableHead className="text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-accent">
            <TableCell className="hidden sm:table-cell">
              <input type="text" placeholder='Enter Product' className="w-full px-2 py-1 border rounded" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <input type="number" placeholder='Enter Unit Price' className="w-full px-2 py-1 border rounded" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <input type="number" placeholder='Enter Quantity' className="w-full px-2 py-1 border rounded" />
            </TableCell>
            <TableCell className="text-right sm:text-left md:text-right">
              <span className="">$250.00</span>
            </TableCell>
          </TableRow>
          <TableRow className="bg-accent sm:hidden">
            <TableCell colSpan={4}>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label>Product</label>
                  <input type="text" placeholder='Enter Product' className="w-full px-2 py-1 border rounded" />
                </div>
                <div>
                  <label>Unit Price</label>
                  <input type="number" placeholder='Enter Unit Price' className="w-full px-2 py-1 border rounded" />
                </div>
                <div>
                  <label>Quantity</label>
                  <input type="number" placeholder='Enter Quantity' className="w-full px-2 py-1 border rounded" />
                </div>
                
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</div>

      <div className='flex justify-between items-center'>
      <Button>Add Item</Button>
      <Button>Update Invoice</Button>
      </div>
    </section>
  )
}

export default page