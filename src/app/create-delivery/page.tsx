"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Trash } from "lucide-react";
import Header from "@/components/Header";
import toast, { Toaster } from "react-hot-toast";
import { Company, DeliveryInputs, DeliveryProducts } from "@/types/types";
import Loader from "@/components/Loader";

const Page = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [products, setProducts] = useState<DeliveryProducts[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleRowAddition = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { description: "", unit: 0 },
    ]);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DeliveryInputs>();

  const fetchCompany = async (CompanyName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/company/findCompany/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CompanyName }),
      });

      const result = await response.json();

      if (!response.ok) {
        setCompany(null);
        console.log("No company found, setting company to null.");
        return;
      }

      setCompany(result.company);
      toast.success(result.message);
      setLoading(false);
    } catch (error) {
      console.log("There was an Error While Fetching Company: ", error);
      toast.error("There was an Error While Fetching Company");
    }
  };

  const companyName = watch("CompanyName");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (companyName) {
      timeoutId = setTimeout(() => {
        fetchCompany(companyName);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [companyName]);

  // Pre-fill the form with company data when company is found
  useEffect(() => {
    if (company) {
      setValue("CompanyName", company.CompanyName || "");
      setValue("CompanyTel", company.CompanyTel || 0);
      setValue("CompanyAddress", company.CompanyAddress || "");
      setValue("ClientNo", company.ClientNo || 0);
      setValue("ClientEmail", company.ClientEmail || "");
      setValue("ClientName", company.ClientName || "");
    }
  }, [company, setValue]);

  const createCompany = async (data: DeliveryInputs) => {
    try {
      const response = await fetch("/api/company/createCompany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CompanyName: data.CompanyName,
          CompanyTel: data.CompanyTel,
          CompanyAddress: data.CompanyAddress,
          ClientNo: data.ClientNo,
          ClientEmail: data.ClientEmail,
          ClientName: data.ClientName,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        return result.company;
      } else {
        throw new Error(result.message || "Error Creating Company");
      }
    } catch (error) {
      console.log("There was an Error While Creating Company: ", error);
      toast.error("There was an Error While Creating Company");
      return null;
    }
  };

  const onSubmit: SubmitHandler<DeliveryInputs> = async (data) => {
    setLoading(true);
    let companyData = company;

    if (!companyData) {
      companyData = await createCompany(data);
    }

    const delivery = {
      ...data,
      CompanyName: companyData?.CompanyName,
      CompanyTel: companyData?.CompanyTel,
      CompanyAddress: companyData?.CompanyAddress,
      ClientNo: companyData?.ClientNo,
      ClientEmail: companyData?.ClientEmail,
      ClientName: companyData?.ClientName,
      products,
    };

    try {
      const response = await fetch("/api/delivery/createDelivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(delivery),
      });

      if (!response.ok) {
        throw new Error("Failed to create Challan");
      }

      const result = await response.json();
      toast.success(result.message);
      reset();
      setProducts([]);
      setCompany(null);
      companyData = null;
      setLoading(false);
    } catch (error: any) {
      console.log("There was an Error While Creating an Challan: ", error);
      toast.error(error.message);
      setLoading(false);
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
      {loading === true ? (
        <Loader />
      ) : (
        <section className="max-container">
        <form
          className="flex flex-col justify-between gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card className="dark:bg-transparent dark:border-[#27272A]">
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">
                Important Information about the Client and its Company
              </CardDescription>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
                <div className="flex flex-col items-start justify-between">
                  <Label className="mb-2">Company Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter Company Name"
                    {...register("CompanyName", { required: true })}
                  />
                  {errors.CompanyName && (
                    <p className="error">Company Name is required</p>
                  )}
                </div>
                {company ? (
                  <>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Company Tel#</Label>
                      <Input
                        type="number"
                        placeholder="Enter Company Tel#"
                        value={company.CompanyTel}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Company Address</Label>
                      <Input
                        type="text"
                        placeholder="Enter Company Address"
                        value={company.CompanyAddress}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Client Mobile #</Label>
                      <Input
                        type="number"
                        placeholder="Enter Client Mobile Number"
                        value={company.ClientNo}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter Client Email"
                        value={company.ClientEmail}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Client Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter Client Name"
                        value={company.ClientName}
                        readOnly
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Company Tel#</Label>
                      <Input
                        type="number"
                        placeholder="Enter Company Tel#"
                        {...register("CompanyTel", { required: true })}
                      />
                      {errors.CompanyTel && (
                        <p className="error">Company Tel# is required</p>
                      )}
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Company Address</Label>
                      <Input
                        type="text"
                        placeholder="Enter Company Address"
                        {...register("CompanyAddress", { required: true })}
                      />
                      {errors.CompanyAddress && (
                        <p className="error">Company Address is required</p>
                      )}
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Client Mobile #</Label>
                      <Input
                        type="number"
                        placeholder="Enter Client Mobile Number"
                        {...register("ClientNo")}
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter Client Email"
                        {...register("ClientEmail")}
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between">
                      <Label className="mb-2">Client Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter Client Name"
                        {...register("ClientName", { required: true })}
                      />
                      {errors.ClientName && (
                        <p className="error">Client Name is required</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
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
                  <Label className="mb-2">DC Date</Label>
                  <Input
                    type="date"
                    {...register("DCDate", { required: true })}
                  />
                  {errors.DCDate && (
                    <p className="error">DC Date is required</p>
                  )}
                </div>
                <div className="flex flex-col items-start justify-between">
                  <Label className="mb-2">PO. No.</Label>
                  <Input
                    type="text"
                    placeholder="Enter PO. No."
                    {...register("PoNumber", { required: true })}
                  />
                  {errors.PoNumber && (
                    <p className="error">PO. No. is required</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-transparent dark:border-[#27272A]">
            <CardHeader>
              <CardTitle>Delivery Products</CardTitle>
              <CardDescription>
                Add, Remove or Update Products for the Delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={index} className="w-full">
                      <TableCell>
                        <Input
                          placeholder="Description"
                          value={product.description}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="unit"
                          value={product.unit}
                          onChange={(e) =>
                            handleInputChange(index, "unit", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Trash
                          className="cursor-pointer"
                          onClick={() => handleDeletion(index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                type="button"
                onClick={handleRowAddition}
                className="mt-2"
              >
                Add Product
              </Button>
            </CardContent>
          </Card>

          <Button type="submit" className="self-end">
            Submit Delivery
          </Button>
        </form>
      </section>
      )}
    </>
  );
};

export default Page;
