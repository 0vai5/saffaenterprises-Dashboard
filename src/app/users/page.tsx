"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import toast, { Toaster } from "react-hot-toast";
import { User, UserInputs } from "@/types/types";
import Loader from "@/components/Loader";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInputs>();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/findUsers", {
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
      }
      setUsers(result.data);
      toast.success(result.message);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        // setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        toast.error("Failed to delete user");
      }
      await fetchUsers();
      toast.success("User deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete user");
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to create user");
      }

      await fetchUsers();
      reset();
      const result = await response.json();
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading && <Loader />}
        <section className="max-container gap-5">
        <Toaster position="top-right" reverseOrder={false} />
        <Card className="px-4 py-4 mb-5 dark:bg-transparent dark:border-[#27272A]">
          <CardTitle>Active Users</CardTitle>
          <CardDescription>All the Users Currently Active</CardDescription>
          <CardContent>
            {users && users.length > 0 ? (
              <div className="grid justify-between grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-3">
                {users.map((user) => (
                  <Card key={user._id} className="px-5 py-5">
                    <CardTitle>{user.username}</CardTitle>
                    <CardContent>
                      <p>{user.email}</p>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => deleteUser(user._id)}>
                        Delete User
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm dark:bg-transparent dark:border-[#27272A]">
          <CardHeader>
            <CardTitle className="text-2xl">Create User</CardTitle>
            <CardDescription>
              Fill out the following form to create a new user
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter Email"
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="Enter Username"
                />
                {errors.username && <p>{errors.username.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter Password"
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create User"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </>
  );
};

export default Page;
