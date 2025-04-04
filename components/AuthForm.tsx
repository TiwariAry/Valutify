'use client'

import React, {useState} from 'react'
import Image from "next/image";
import Link from "next/link";

{/* Shadcn forms */}
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import CustomInput from "@/components/CustomInput";
import {authFormSchema} from '@/lib/utils'
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {SignIn, SignUp} from "@/lib/actions/user.actions";

const AuthForm = ({type}: { type: string }) => {
    const router = useRouter();

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);



    // Assigning the type to mak ethe sign-up fields optional because when in sign-in, it will also try to evaluate sign-up fields
    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true)

        try {
            // Sign Up with Appwrite & create plaid token
            if (type == 'sign-up') {
                const newUser = await SignUp(data);

                setUser(newUser);
            }

            if (type == 'sign-in') {
                const response = await SignIn({
                    email: data.email,
                    password: data.password
                })

                console.log('This is the response', response);

                if (response) {
                    router.push("/")
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <section className={"auth-form"}>
            <header className={"flex flex-col gap-5 md:gap-8"}>
                <Link href={'/'} className={"flex cursor-pointer items-center gap-1"}>
                    {/*NextJS Image*/}
                    <Image
                        src={"/icons/logo.png"}
                        width={34}
                        height={34}
                        alt={"Valutify logo"}
                    />
                    <h1 className={"text-26 font-ibm-plex-serif font-bold text-black-1"}>
                        Valutify
                    </h1>
                </Link>

                <div className={"flex flex-col gap-1 md:gap-3"}>
                    <h1 className={"text-24 lg:text-36 font-semibold text-gray-900"}>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign in' : 'Sign Up'}
                    </h1>
                    <p className={"text-16 font-normal text-gray-600"}>
                        {user
                            ? 'Link your Account to get started'
                            : 'Please enter your account details'}
                    </p>
                </div>
            </header>

            {/* Always build proper forms */}
            {user ? (
                    <div className={"flex flex-col gap-4"}>
                        {/*Paid link*/}
                    </div>
                )
                :
                (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {type === 'sign-up' && (
                                    <>
                                        <div className={"flex gap-4 w-full"}>
                                            <div className={"flex-1"}>
                                                <CustomInput control={form.control} name={"firstName"} label={"First Name"} placeholder={"Enter your first name"}/>
                                            </div>
                                            <div className={"flex-1"}>
                                                <CustomInput control={form.control} name={"lastName"} label={"Last Name"} placeholder={"Enter your last name"}/>
                                            </div>
                                        </div>
                                        <CustomInput control={form.control} name={"address1"} label={"Address"} placeholder={"Enter your address"}/>
                                        <CustomInput control={form.control} name={"city"} label={"City"} placeholder={"Ex: Raipur"}/>
                                        <div className={"flex gap-4"}>
                                            <div className={"flex-1"}>
                                                <CustomInput control={form.control} name={"state"} label={"State"} placeholder={"Ex: Chhattisgarh"}/>
                                            </div>
                                            <div className={"flex-1"}>
                                                <CustomInput control={form.control} name={"postalcode"} label={"Postal Code"} placeholder={"Ex: 10001"}/>
                                            </div>
                                        </div>
                                        <div className={"flex gap-4"}>
                                            <div className={"flex-1"}>
                                                <CustomInput control={form.control} name={"dob"} label={"Date of Birth"} placeholder={"YYYY-MM-DD"}/>
                                            </div>
                                            <div className={"flex-1"}>
                                                <CustomInput control={form.control} name={"aadhaar"} label={"Aadhaar No."} placeholder={"Ex: 123456789123"}/>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <CustomInput control={form.control} name={"email"} label={"Email"} placeholder={"Enter your email"}/>
                                <CustomInput control={form.control} name={"password"} label={"Password"} placeholder={"Enter your password"}/>

                                <div className={"flex flex-col gap-4"}>
                                    <Button className={"form-btn"} type="submit" disabled={isLoading}>
                                        {isLoading? (
                                            <>
                                                <Loader2 size={20} className={"animate-spin"}/> &nbsp;
                                                Loading...
                                            </>
                                        ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        <footer className={"flex justify-center gap-1"}>
                            <p className={"text-14 font-normal text-gray-600"}>
                                {type == 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                            </p>
                            <Link className={"form-link"} href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                            </Link>
                        </footer>
                    </>
                )
            }
        </section>
    )
}
export default AuthForm
