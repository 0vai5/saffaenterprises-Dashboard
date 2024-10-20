"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/Header";
import toast, { Toaster } from "react-hot-toast";
import { BillInputs, BillProducts, DeliveryData } from "@/types/types";

const Page = () => {
  const [products, setProducts] = useState<BillProducts[]>([]);
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BillInputs>();

  const fetchDelivery = async (SerialNo: number) => {
    const response = await fetch("/api/delivery/getDeliveryBySerialNo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SerialNo }),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    console.log("Fetched delivery data:", result.data);

    setDeliveryData(result.data);

    if (result.data.products) {
      const productArray = result.data.products.map((product: any) => ({
        description: product.description,
        unit: product.unit,
        unitPrice: 0,
        total: 0,
      }));

      setProducts(productArray);
    }

    toast.success(result.message);
  };

  useEffect(() => {
    if (deliveryData) {
      console.log("Updated deliveryData:", deliveryData);
    }
  }, [deliveryData]);

  let SerialNo = watch("SerialNo");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (SerialNo) {
      timeoutId = setTimeout(() => {
        fetchDelivery(SerialNo);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [SerialNo]);

  const onSubmit: SubmitHandler<BillInputs> = async (data) => {
    const grandTotal = calculateGrandTotal();
    let deliveryInfo = deliveryData;
    console.log("delivery Information", deliveryInfo);
    const bill = {
      SerialNo: data.SerialNo,
      products,
      grandTotal,
      CompanyName: deliveryInfo?.CompanyName,
      CompanyAddress: deliveryInfo?.CompanyAddress, 
      CompanyTel: deliveryInfo?.CompanyTel,
      ClientEmail: deliveryInfo?.ClientEmail,
      ClientName: deliveryInfo?.ClientName,
      ClientNo: deliveryInfo?.ClientNo,
      DCDate: deliveryInfo?.DCDate,
      DeliveryRef: deliveryInfo?._id,
      PoNumber: deliveryInfo?.PoNumber,
    };

    console.log("Bill Data:", bill);
    try {
      const response = await fetch("/api/bill/createBill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bill),
      });

      if (!response.ok) {
        const result = await response.json();
        console.log("Failed to create bill:", result.message);
        throw new Error(result.message || "Failed to create bill");
      }

      const result = await response.json();
      console.log("Bill Created Successfully:", result.message); // Log success message
      toast.success(result.message);

      reset();
      setProducts([]);
    } catch (error: any) {
      console.error("Error While Creating Bill:", error.message); // Log the error message
      toast.error(error.message); // Show error to the user
    }
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
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

  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <section className="max-container">
        <form
          className="flex flex-col justify-between gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card className="dark:bg-transparent dark:border-[#27272A]">
            <CardHeader>
              <CardTitle>delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">
                Important Information about the delivery and Delivery
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex flex-col items-start justify-between">
                  <Label className="mb-2">Serial No.</Label>
                  <Input
                    type="number"
                    {...register("SerialNo", { required: true })}
                    placeholder="Enter Serial No."
                  />
                  {errors.SerialNo && (
                    <p className="error">SerialNo. is required</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-transparent dark:border-[#27272A]">
            <CardHeader className="px-7">
              <CardTitle>Products Information</CardTitle>
              <CardDescription>
                Products Purchased by the Client
              </CardDescription>
            </CardHeader>
            <CardContent className="mb-5">
              <div className="overflow-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="grid grid-cols-5 items-center pt-5">
                      <TableHead className="hidden md:table-cell">
                        Description
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Unit
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Unit Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow
                        key={index}
                        className="bg-accent grid justify-between grid-cols-1 md:grid-cols-5 items-center"
                      >
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="Description"
                            value={product.description} // Now shows product description
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="table-cell">
                          <Input
                            type="number"
                            placeholder="Unit"
                            value={product.unit}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "unit",
                                Number(e.target.value)
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="table-cell">
                          <Input
                            type="number"
                            placeholder="Unit Price"
                            value={product.unitPrice}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "unitPrice",
                                Number(e.target.value)
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          Rs.{" "}
                          {product.total ? product.total.toFixed(2) : "0.00"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center flex-row">
              <div>Grand Total: Rs. {calculateGrandTotal().toFixed(2)}</div>
            </CardFooter>
          </Card>

          <Button variant={"secondary"} type="submit">
            Create Bill
          </Button>
        </form>
      </section>
    </>
  );
};

export default Page;
