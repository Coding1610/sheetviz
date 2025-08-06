import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    FormControl, FormField, FormItem, FormMessage, Form, FormLabel
} from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LogIn, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteIndex, RouteSignUp, RouteLandingPage } from '@/helpers/RouteName'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import GoogleAuth from '@/components/GoogleAuth'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/User/slice'
import logo from '../assets/file.png'

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(false);

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters long.'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    async function onSubmit(values) {
        setLoading(true);
        setErrorState(false);
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/login`, {
                method: "post",
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            });
            const data = await response.json();
            if (!response.ok) {
                setErrorState(true);
                showToast('Error', data.message || 'Login Failed');
                return;
            }
            dispatch(setUser(data.user));
            showToast('Success', data.message || "Login Successfully");
            navigate(RouteIndex);
        } catch (error) {
            setErrorState(true);
            showToast('Error', error.message || 'Something Went Wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-gradient-to-br from-white via-brandpurplesoft to-darkRed/30 flex justify-center items-center w-screen h-screen font-roboto px-2'>
            <Card className="w-[340px] md:w-[450px] p-6 pt-8 pb-8">
                <div className='w-full flex flex-col gap-2 justify-center items-center mb-6'>
                    <Link to={RouteLandingPage} className='font-roboto font-bold text-2xl flex justify-center items-center gap-2 mb-1'>
                        <img src={logo} className='w-7' />
                        <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-darkRed to-midRed animate-fade-in">SheetViz</p>
                    </Link>
                    <h2 className='flex justify-center items-center text-xl font-roboto font-bold text-gray-700'>Login into your account</h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-roboto text-[15px]">Email</FormLabel>
                                        <FormControl>
                                            <Input className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your email..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-roboto text-[15px]">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your password..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='font-roboto font-normal w-full flex flex-col justify-center items-center gap-3'>
                            <GoogleAuth />
                            <Button
                                type="submit"
                                disabled={loading}
                                className={`w-full rounded-lg font-roboto flex items-center justify-center gap-2
                                    ${loading ? 'bg-green-600 hover:bg-green-700' : errorState ? 'bg-red-600 hover:bg-red-700' : 'bg-darkRed hover:bg-midRed'}
                                `}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4 text-white" />
                                        Loading...
                                    </>
                                ) : errorState ? (
                                    <>
                                        ❌ Error
                                    </>
                                ) : (
                                    <>
                                        <LogIn className='text-white' />
                                        Sign In
                                    </>
                                )}
                            </Button>
                            <div>
                                <p className='text-gray-800'>Don't have an account ?<Link className='pl-1 font-bold text-darkRed hover:underline' to={RouteSignUp}>sign up</Link></p>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
}