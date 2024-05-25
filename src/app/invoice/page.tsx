'use client'

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { DatePickerDemo } from '@/components/DatePicker';
import { useForm, SubmitHandler } from "react-hook-form";

const Page: React.FC = () => {
  type Inputs = {
    ClientNo: 0;
    password: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }


  const [products, setProducts] = useState<Array<{ product: string, quantity: number | null, unitPrice: number | null, totalPrice: number | null }>>([]);

  const handleRowAddition = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        product: '',
        quantity: null,
        unitPrice: null,
        totalPrice: null,
      },
    ]);
    console.log(products)
  };

  const handleInputChange = (index: number, field: string, value: string | number | null) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
      if (field === 'quantity' || field === 'unitPrice') {
        const unitPrice = updatedProducts[index].unitPrice ?? 0;
        const quantity = updatedProducts[index].quantity ?? 0;
        updatedProducts[index].totalPrice = unitPrice && quantity ? unitPrice * quantity : null;
      }
      return updatedProducts;
    });
  };

  const calculateGrandTotal = () => {
    return products.reduce((total, product) => {
      return total + (product.totalPrice ?? 0); // Use 0 if totalPrice is null
    }, 0);
  };

  const handleRowDeletion = (index: number) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  return (
    <section className='max-container'>
      <form>
        <h1 className='subhead-text mb-10'>Clients Information</h1>
        <div className='flex flex-col md:flex-row justify-between items-center gap-3 mb-5'>
          <div className='flex justify-start flex-col items-start'>
            <label>Clients No:</label>
            <input type="number" id="phNum" placeholder='Enter Phone Number' className='border rounded-lg border-slate-400 px-3 py-1' />
          </div>
          <div className='flex justify-start flex-col items-start'>
            <label>Clients Email:</label>
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
                    <TableHead className="hidden sm:table-cell">Product</TableHead>
                    <TableHead className="hidden sm:table-cell">Unit Price</TableHead>
                    <TableHead className="hidden md:table-cell">Quantity</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <React.Fragment key={index}>
                      <TableRow className="hidden sm:table-row bg-accent">
                        <TableCell>
                          <input
                            type="text"
                            value={product.product}
                            onChange={(e) => handleInputChange(index, 'product', e.target.value)}
                            placeholder='Enter Product'
                            className="w-full px-2 py-1 border rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            value={product.unitPrice ?? ''}
                            onChange={(e) => handleInputChange(index, 'unitPrice', parseFloat(e.target.value) || null)}
                            placeholder='Enter Unit Price'
                            className="w-full px-2 py-1 border rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            value={product.quantity ?? ''}
                            onChange={(e) => handleInputChange(index, 'quantity', parseInt(e.target.value) || null)}
                            placeholder='Enter Quantity'
                            className="w-full px-2 py-1 border rounded"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <span>
                            {product.unitPrice && product.quantity ? `$${(product.unitPrice * product.quantity).toFixed(2)}` : 'Rs.0.00'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button onClick={() => handleRowDeletion(index)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="sm:hidden bg-accent">
                        <TableCell colSpan={5}>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label>Product</label>
                              <input
                                type="text"
                                value={product.product}
                                onChange={(e) => handleInputChange(index, 'product', e.target.value)}
                                placeholder='Enter Product'
                                className="w-full px-2 py-1 border rounded"
                              />
                            </div>
                            <div>
                              <label>Unit Price</label>
                              <input
                                type="number"
                                value={product.unitPrice ?? ''}
                                onChange={(e) => handleInputChange(index, 'unitPrice', parseFloat(e.target.value) || null)}
                                placeholder='Enter Unit Price'
                                className="w-full px-2 py-1 border rounded"
                              />
                            </div>
                            <div>
                              <label>Quantity</label>
                              <input
                                type="number"
                                value={product.quantity ?? ''}
                                onChange={(e) => handleInputChange(index, 'quantity', parseInt(e.target.value) || null)}
                                placeholder='Enter Quantity'
                                className="w-full px-2 py-1 border rounded"
                              />
                            </div>
                            <div className="text-right">
                              <label>Amount</label>
                              <div>
                                {product.unitPrice && product.quantity ? `${(product.unitPrice * product.quantity).toFixed(2)}` : 'Rs. 0.00'}
                              </div>
                            </div>
                            <div className="text-right">
                              <Button onClick={() => handleRowDeletion(index)}>Delete</Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
        <h2 className="font-bold">Grand Total: Rs.{calculateGrandTotal().toFixed(2)}</h2>
      </div>
      </form>

      <div className='flex justify-between items-center'>
        <Button onClick={handleRowAddition}>Add Item</Button>
        <Button>Create Invoice</Button>
      </div>
    </section>
  );
}

export default Page;
