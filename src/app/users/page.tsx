'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type Inputs = {
  email: string;
  password: string;
  username: string;
};

type User = {
  _id: string;
  username: string;
  email: string;
};

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/findUsers');
        const result = await response.json();
        if (response.ok) {
          setUsers(result.data);
          setError(null);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Error fetching users');
      }
    };
    
    fetchUsers();
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch('/api/users/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      } else {
        console.log('Failed to delete user');
      }
    } catch (error) {
      console.log('Failed to delete user', error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to create user');
      }

      const result = await response.json();
      const newUser = result.data;
      
      // Debugging state update
      setUsers((prevUsers) => {
        if (!Array.isArray(prevUsers)) {
          console.error('prevUsers is not an array:', prevUsers);
          return prevUsers;
        }
        return [...prevUsers, newUser];
      });

      reset();

    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-container gap-5">
      <Card className='px-4 py-4 mb-5'>
        <CardTitle>Active Users</CardTitle>
        <CardDescription>All the Users Currently Active</CardDescription>
        <CardContent>
          {users.length > 0 ? (
            <div className="grid justify-between grid-cols-1 md:grid-cols-3 gap-3">
              {users.map((user) => (
                <Card key={user._id} className='px-5 py-5'>
                  <CardTitle>{user.username}</CardTitle>
                  <CardContent>
                    <p>{user.email}</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => deleteUser(user._id)}>Delete User</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
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
                {...register('email', {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input {...register('username', { required: "Username is required" })} />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register('password', { required: "Password is required" })} />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Page;
