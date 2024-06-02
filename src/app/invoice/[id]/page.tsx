'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowDownToLine, Printer } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import ReactToPrint from 'react-to-print';

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
      product: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }[];
    grandTotal: number;
};

const Page = ({ params }: any) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const fetchInvoiceById = async () => {
        try {
            const response = await fetch('/api/invoice/findInvoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: params.id })    
            });

            if (!response.ok) {
                throw new Error('Error Occurred while Fetching Invoice');
            }
            const result = await response.json();
            setInvoice(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInvoiceById();
    }, [params.id]);

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <section className='max-container'>
            <div className="flex items-center justify-end mb-4 gap-3">
                <ReactToPrint
                    trigger={() => (
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                            <Printer className="h-3.5 w-3.5" />
                            <span className="not-sr-only">Print</span>
                        </Button>
                    )}
                    content={() => cardRef.current}
                />
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="not-sr-only">Edit</span>
                </Button>
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <ArrowDownToLine className="h-3.5 w-3.5" />
                    <span className="not-sr-only">Download</span>
                </Button>
            </div>
            <div ref={cardRef}>
                <Card>
                    <CardHeader>
                        <Image
                            src={'/saffaenterprises.png'}
                            alt='company logo'
                            width={150}
                            height={75}
                        />
                        <CardTitle>Invoice# {invoice._id}</CardTitle>
                    </CardHeader>
                    <CardContent className='mb-10 max-container'>
                        <div className='flex justify-between item-center mb-10'>
                            <div className="flex flex-col">
                                <h1 className='text-base font-bold'>Billed To:</h1>
                                <p><span className='font-semibold'>OrganizationName:</span> {invoice.OrganizationName}</p>
                                <p><span className='font-semibold'>OrganizationTel#:</span> {invoice.OrganizationTel}</p>
                                <p><span className='font-semibold'>OrganizationAddress:</span> {invoice.OrganizationAddress}</p>
                            </div>
                            <div className="flex flex-col">
                                <h1 className='text-base font-bold'>PO. No. {invoice.PoNumber}</h1>
                                <p><span className='font-semibold'>InvoiceDate:</span> {invoice.InvoiceDate}</p>
                                <p><span className='font-semibold'>DCDate:</span> {invoice.DCDate}</p>
                                <p><span className='font-semibold'>DCNo:</span> {invoice.DCNo}</p>
                            </div>
                        </div>

                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Quantity
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Unit Price
                                            </TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoice.products.map((product, index) => (
                                            <TableRow key={index} className="bg-accent">
                                                <TableCell>
                                                    <div className="font-medium">{product.product}</div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {product.quantity}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                   Rs. {product.unitPrice}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    Rs. {product.quantity * product.unitPrice}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </CardContent>
                    <CardFooter className='flex justify-between items-end md:items-center px-10 md:flex-row flex-col-reverse gap-[3rem]'>
                        <div className='flex justify-end items-end flex-col gap-4'>
                            <Separator className='font-bold' />
                            <p className='font-bold'>CEO SaffaEnterprises</p>
                            <p className='font-semibold'>Waseem Haroon</p>
                        </div>
                        <div className='flex justify-end items-end flex-col gap-5'>
                            <p className='align-center'><span className='font-bold'>Total: </span>Rs. {invoice.grandTotal}</p>
                            <Separator />
                            <p><span className='font-bold'>Grand Total: </span>Rs. {invoice.grandTotal}</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
};

export default Page;
