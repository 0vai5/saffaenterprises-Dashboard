import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowDownToLine, Printer } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import ReactToPrint from 'react-to-print'

const page = () => {
    return (
        <section className='max-container'>
            <div className="flex items-center justify-end mb-4 gap-3">
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <Printer className="h-3.5 w-3.5" />
                    <span className="not-sr-only">Print</span>
                </Button>
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="not-sr-only">Edit</span>
                </Button>
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <ArrowDownToLine className="h-3.5 w-3.5" />
                    <span className="not-sr-only">Download</span>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <Image
                        src={'/saffaenterprises.png'}
                        alt='company logo'
                        width={150}
                        height={75}
                    />
                </CardHeader>
                <CardContent className='mb-10 max-container'>
                    <div className='flex justify-between item-center mb-10'>
                        <div className="flex flex-col">
                            <h1 className='text-base font-bold'>Billed To:</h1>
                            <p>Comapny Name</p>
                            <p>company Tel.</p>
                            <p>Company Address</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className='text-base font-bold'>PO. No. 12346</h1>
                            <p>dd/mm/yyyy</p>
                            <p>DC Date</p>
                            <p>DC No.</p>
                        </div>
                    </div>

                    {/* Product */}

                    <Card x-chunk="dashboard-05-chunk-3">
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
                                    <TableRow className="bg-accent">
                                        <TableCell>
                                            <div className="font-medium">PT-100</div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            1000
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            100
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow className="bg-accent">
                                        <TableCell>
                                            <div className="font-medium">PT-100</div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            1000
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            100
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
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
                        <p className='align-center'><span className='font-bold'>Total: </span>Rs. 12000</p>
                        <Separator />
                        <p><span className='font-bold'>Grand Total: </span>Rs. 12000</p>
                    </div>
                </CardFooter>
            </Card>
        </section>
    );
}

export default page;
