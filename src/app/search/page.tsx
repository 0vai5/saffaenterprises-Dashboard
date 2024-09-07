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

type Challan = {
  _id: string;
  DCNo: string;
  invoiceId: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  InvoiceDate: string;
  PoNumber: string;
  DCDate: string;
  products: {
    description: string;
    unit: number;
    unitPrice: number
    total: number;
  }[];
  grandTotal: number;
};

const Search = () => {
  const [data, setData] = useState<Challan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (FormData) => {
    setError(null); // Reset error state
    try {
      const response = await fetch('/api/delivery/searchDelivery', {
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
      const response = await fetch('/api/challan/deleteChallan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: _id }),
      });

      if (response.ok) {
        setData((prevChallan) => prevChallan.filter(challan => challan._id !== _id));
        console.log(`Challan with ID ${_id} deleted successfully.`);
      } else {
        console.log(`Failed to delete Challan with ID ${_id}: ${response.statusText}`);
      }
    } catch (error) {
      console.log(`Failed to delete Challan with ID ${_id}`, error);
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
            <CardDescription>Search for Challans</CardDescription>
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
          <h1 className='subhead-text mb-5'>Challan History</h1>
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
              <CardTitle>Challans</CardTitle>
              <CardDescription>Recent Challans registered.</CardDescription>
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
                      data.map((challan, index) => (
                        <TableRow key={index} className='bg-accent'>
                          <TableCell>
                            <Link href={`/invoice/${challan._id}`}>
                              <div className='font-medium'>
                                <p>{challan.CompanyName}</p>
                                <p>{challan.ClientEmail}</p>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell className='hidden md:table-cell'>
                            <Link href={`/invoice/${challan._id}`}>
                              {challan.InvoiceDate}
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
                                    <Button size='sm' variant='destructive' className='h-7 gap-1 text-sm' onClick={() => deleteInvoice(challan._id)}>
                                      <Trash className='h-3.5 w-3.5' />
                                      <span className='not-sr-only'>Delete</span>
                                    </Button>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Link href={'/delivery/' + challan._id}>
                                      <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
                                        <Eye className='h-3.5 w-3.5' />
                                        <span className='not-sr-only'>View DC</span>
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
