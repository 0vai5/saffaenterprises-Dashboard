'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  File,
  Trash,
  ArrowDownToLine,
  Pencil,
  EllipsisVerticalIcon,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type Inputs = {
  Organization: string;
  Date: string;
};

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
    name: string;
    quantity: number;
    price: number;
  }[];
  grandTotal: number;
};

const Search = () => {
  const [data, setData] = useState<Invoice[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const response = await fetch('/api/users/searchInvoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  const deleteInvoice = async (_id: string) => {
    try {
      const response = await fetch('/api/users/deleteInvoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: _id }),
      });

      if (response.ok) {
        setData((prevInvoice) => prevInvoice.filter(invoice => invoice._id !== _id));
        console.log(`Invoice with ID ${_id} deleted successfully.`);
      } else {
        console.log(`Failed to delete invoice with ID ${_id}: ${response.statusText}`);
      }
    } catch (error) {
      console.log(`Failed to delete invoice with ID ${_id}`, error);
    }
  };

  return (
    <section className='max-container'>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Search for Invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col md:flex-row justify-between gap-10 items-center mb-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex justify-start flex-col items-start'>
              <Label>Search</Label>
              <Input
                type='text'
                {...register('Organization', { required: true })}
                placeholder='Invoice ID or Organisation'
                className='border rounded-lg border-slate-400 px-3 py-1'
              />
              {errors.Organization && <p className='error'>Organization is required</p>}
            </div>
            <div className='flex justify-start flex-col items-start'>
              <Label>Date</Label>
              <Input
                type='date'
                {...register('Date')}
                className='border rounded-lg border-slate-400 px-3 py-1'
              />
            </div>
            <div className='flex justify-start flex-col items-start'>
              <Button className='relative top-1.5'>Search</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <h1 className='subhead-text mb-5'>Invoice History</h1>
      <Card>
        <CardHeader className='px-7'>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
          <div className='ml-auto flex items-center gap-2'>
            <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
              <File className='h-3.5 w-3.5' />
              <span className='not-sr-only'>Export</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className='hidden md:table-cell'>Invoice Date</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((invoice, index) => (
                    <TableRow key={index} className='bg-accent'>
                      <TableCell>
                        <Link href={`/invoice/${invoice._id}`}>
                          <div className='font-medium'>
                            <p>{invoice.OrganizationName}</p>
                            <p>{invoice.ClientEmail}</p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <Link href={`/invoice/${invoice._id}`}>
                          {invoice.InvoiceDate}
                        </Link>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Link href={`/invoice/${invoice._id}`}>
                          ${invoice.grandTotal.toFixed(2)}
                        </Link>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='ml-auto flex items-center justify-center gap-2'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
                                <EllipsisVerticalIcon className='h-3.5 w-3.5' />
                                <span className='not-sr-only'>More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuLabel>More</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Button size='sm' variant='destructive' className='h-7 gap-1 text-sm' onClick={() => deleteInvoice(invoice._id)}>
                                  <Trash className='h-3.5 w-3.5' />
                                  <span className='not-sr-only'>Delete</span>
                                </Button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href={`/edit-invoice/${invoice._id}`}>
                                  <Button size='sm' variant='secondary' className='h-7 gap-1 text-sm'>
                                    <Pencil className='h-3.5 w-3.5' />
                                    <span className='not-sr-only'>Edit</span>
                                  </Button>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
                                  <ArrowDownToLine className='h-3.5 w-3.5' />
                                  <span className='not-sr-only'>Download</span>
                                </Button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className='text-center'>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Search;
