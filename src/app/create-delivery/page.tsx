'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import toast, { Toaster } from 'react-hot-toast';
import ShortUniqueId from 'short-unique-id';

type Inputs = {
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  deliveryDate: string;
  PoNumber: string;
  DCDate: string;
  InvoiceDate: string
}

type Products = {
  description: string;
}

const Page = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);
  const uid = new ShortUniqueId();

  const handleRowAddition = () => {
    setProducts((prevProducts) => [...prevProducts, { description: ''}]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const delivery = {
      DCNo: uid.rnd(5),
       ...data,
        products,
      };

    try {
      const response = await fetch('/api/delivery/createDelivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(delivery)
      });

      if (!response.ok) {
        throw new Error('Failed to create Challan');
      }

      const result = await response.json();
      toast.success(result.message);
      reset();
      setProducts([]);
    } catch (error: any) {
      console.log('There was an Error While Creating an Challan: ', error);
      toast.error(error.message);
    }
  };

  const handleInputChange = (index: number, field: string, value: string | number) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = { ...updatedProducts[index], [field]: value };
      updatedProducts[index] = product;
      return updatedProducts;
    });
  };

  const handleDeletion = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <section className='max-container'>
        <form className='flex flex-col justify-between gap-4' onSubmit={handleSubmit(onSubmit)}>
          <Card className='dark:bg-transparent dark:border-[#27272A]'>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='mb-3'>
                Important Information about the Client and its Company
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>Company Name</Label>
                  <Input
                    type='text'
                    placeholder='Enter Company Name'
                    {...register('CompanyName', { required: true })}
                  />
                  {errors.CompanyName && <p className="error">Company Name is required</p>}
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>Company Tel#</Label>
                  <Input
                    type='number'
                    placeholder='Enter Company Tel#'
                    {...register('CompanyTel', { required: true })}
                  />
                  {errors.CompanyTel && <p className="error">Company Tel# is required</p>}
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>Company Address</Label>
                  <Input
                    type='text'
                    placeholder='Enter Company Address'
                    {...register('CompanyAddress', { required: true })}
                  />
                  {errors.CompanyAddress && <p className="error">Company Address is required</p>}
                </div>
                
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>Client Mobile #</Label>
                  <Input
                    type='number'
                    placeholder='Enter Client Mobile Number'
                    {...register('ClientNo')}
                  />
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder='Enter Client Email'
                    {...register('ClientEmail', {
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email address"
                      }
                    })} />
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>Client Name</Label>
                  <Input
                    type='text'
                    placeholder='Enter Client Name'
                    {...register('ClientName')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='dark:bg-transparent dark:border-[#27272A]'>
            <CardHeader>
              <CardTitle>delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='mb-3'>
                Important Information about the delivery and Delivery
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>DC Date</Label>
                  <Input type='date'
                    {...register('DCDate', { required: true })}
                  />
                  {errors.DCDate && <p className="error">DC Date is required</p>}
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>InvoiceDate</Label>
                  <Input type='date'
                    {...register('InvoiceDate', { required: true })}
                  />
                  {errors.InvoiceDate && <p className="error">Date is required</p>}
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>PO. No.</Label>
                  <Input type='text'
                    {...register('PoNumber', { required: true })}
                  />
                  {errors.PoNumber && <p className="error">PO. No. is required</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='dark:bg-transparent dark:border-[#27272A]'>
            <CardHeader className="px-7">
              <CardTitle>Products Information</CardTitle>
              <CardDescription>Products Purchased by the Client</CardDescription>
            </CardHeader>
            <CardContent className='mb-5'>
              <div className="overflow-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className='grid grid-cols-5 items-center pt-5'>
                      <TableHead className='hidden md:table-cell'>Description</TableHead>
                      <TableHead className="hidden md:table-cell">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={index} className="bg-accent grid justify-between grid-cols-1 md:grid-cols-5 items-center">
                        <TableCell>
                          <Input
                            type="text"
                            placeholder='Description'
                            value={product.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 gap-1 text-sm"
                            onClick={() => handleDeletion(index)}
                          >
                            <Trash className="h-3.5 w-3.5" />
                            <span className="not-sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center flex-row'>
              <div>
                <Button type="button" onClick={handleRowAddition}>Add Item</Button>
              </div>
            </CardFooter>
          </Card>

          <Button variant={'secondary'} type="submit">Create Delivery</Button>
        </form>
      </section>
    </>
  );
};

export default Page;
