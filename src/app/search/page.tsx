'use client';

import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast'
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
import { File, Trash, EllipsisVerticalIcon, Eye } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ReactToPrint from 'react-to-print';
import Header from '@/components/Header';

type Inputs = {
  searchQuery: string;
};

type Invoice = {
  _id: string;
  invoiceId: string;
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
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (FormData) => {
    setError(null); // Reset error state
    try {
      const response = await fetch('/api/invoice/searchInvoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      });

      if (!response.ok) {
        console.log('An error occured')
      }

      const result = await response.json();
      setData(result.data);
      toast.success(result.message)
    } catch (error: any) {
      console.error('An error occurred while fetching data:', error);
      toast.error(error)
    }
  };

  const deleteInvoice = async (_id: string) => {
    try {
      const response = await fetch('/api/invoice/deleteInvoice', {
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
    <>
      <Header />
      <section className='max-container'>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
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
                  {...register('searchQuery', { required: true })}
                  placeholder='Search by Invoice ID, Organisation, Client, etc.'
                  className='border rounded-lg border-slate-400 px-3 py-1'
                />
                {errors.searchQuery && <p className='error'>Search query is required</p>}
              </div>
              <div className='flex justify-start flex-col items-start'>
                <Button className='relative top-1.5'>Search</Button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </CardContent>
        </Card>
        <div className='flex items-center justify-between '>
          <h1 className='subhead-text mb-5'>Invoice History</h1>
          <div className='ml-auto flex items-center gap-2'>
            <ReactToPrint
              trigger={() => (
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                  <File className="h-3.5 w-3.5" />
                  <span className="not-sr-only">Export</span>
                </Button>
              )}
              content={() => cardRef.current}
            />
          </div>
        </div>
        <div ref={cardRef}>
          <Card>
            <CardHeader className='px-7'>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
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
                    {data && data.length > 0 ? (
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
                              Rs. {invoice.grandTotal.toFixed(2)}
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
                                    <Link href={'/invoice/' + invoice._id}>
                                      <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
                                        <Eye className='h-3.5 w-3.5' />
                                        <span className='not-sr-only'>View</span>
                                      </Button>
                                    </Link>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className='text-center'>No invoices found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Search;
