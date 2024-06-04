'use client'

import React, { useEffect, useState } from 'react';
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
  InvoiceDate: string;
  PoNumber: string;
  DCNo: number;
  DCDate: string;
}

type Products = {
  description: string;
  unit: number;
  unitPrice: number;
  total: number;
}

const Page = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);
  const uid = new ShortUniqueId();

  const handleRowAddition = () => {
    setProducts((prevProducts) => [...prevProducts, { description: '', unit: 1, unitPrice: 0, total: 0 }]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const grandTotal = calculateGrandTotal();
    const invoice = {invoiceID: uid.rnd(10), ...data, products, grandTotal };

    try {
      const response = await fetch('/api/invoice/createInvoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice)
      });

      if (!response.ok) {
        throw new Error('Failed to create Invoice');
      }

      const result = await response.json();
      toast.success(result.message);
      reset();
      setProducts([]);
    } catch (error: any) {
      console.log('There was an Error While Creating an Invoice: ', error);
      toast.error(error.message);
    }
  };

  const handleInputChange = (index: number, field: string, value: string | number) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = { ...updatedProducts[index], [field]: value };
      product.total = product.unit * product.unitPrice;
      updatedProducts[index] = product;
      return updatedProducts;
    });
  };

  const calculateGrandTotal = () => {
    return products.reduce((total, product) => total + product.total, 0);
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
          <Card>
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
                    type='text'
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

          <Card>
            <CardHeader>
              <CardTitle>Invoice Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='mb-3'>
                Important Information about the Invoice and Delivery
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>DC No. #</Label>
                  <Input
                    type='number'
                    placeholder='Enter Delivery Number'
                    {...register('DCNo', { required: true })}
                  />
                  {errors.DCNo && <p className="error">DC No. # is required</p>}
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>DC Date</Label>
                  <Input type='date'
                    {...register('DCDate', { required: true })}
                  />
                  {errors.DCDate && <p className="error">DC Date is required</p>}
                </div>
                <div className='flex flex-col items-start justify-between'>
                  <Label className='mb-2'>Invoice Date</Label>
                  <Input type='date'
                    {...register('InvoiceDate', { required: true })}
                  />
                  {errors.InvoiceDate && <p className="error">Invoice Date is required</p>}
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

          <Card>
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
                      <TableHead className="hidden md:table-cell">Unit</TableHead>
                      <TableHead className="hidden md:table-cell">Unit Price</TableHead>
                      <TableHead className="hidden md:table-cell">Amount</TableHead>
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
                        <TableCell className="table-cell">
                          <Input
                            type="number"
                            placeholder='Unit'
                            value={product.unit}
                            onChange={(e) => handleInputChange(index, 'unit', Number(e.target.value))}
                          />
                        </TableCell>
                        <TableCell className="table-cell">
                          <Input
                            type="number"
                            placeholder='Unit Price'
                            value={product.unitPrice}
                            onChange={(e) => handleInputChange(index, 'unitPrice', Number(e.target.value))}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          Rs. {product.total ? product.total.toFixed(2) : '0.00'}
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
              <div>
                Grand Total: Rs. {calculateGrandTotal().toFixed(2)}
              </div>
            </CardFooter>
          </Card>

          <Button variant={'secondary'} type="submit">Create Invoice</Button>
        </form>
      </section>
    </>
  );
};

export default Page;
