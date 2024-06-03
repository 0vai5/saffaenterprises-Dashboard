'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";

type Inputs = {
  email: string;
  password: string;
};

const Page = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.log("Can't find user")
      }

      router.push('/')
    } catch (error) {
      console.log('Error in Logging in: ', error)
    }
  }

  return (
    <>
      <div className="px-4 py-4">
        <Link
          href="/"
        >
          <Image
            src={'/saffaenterprises.png'}
            alt="Company Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <section className="container flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email address"
                    }
                  })} />
                {errors.email && <p className="text-red-700">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="Enter Password" {...register('password', { required: true })} />
                {errors.email && <p className="text-red-700">{errors.email.message}</p>}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">Sign in</Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </>
  );
};

export default Page;
