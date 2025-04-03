import React from 'react'
import {FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control, FieldPath} from "react-hook-form";
import {z} from "zod";
import {authFormSchema} from "@/lib/utils";

// We need all the fields
const formSchema = authFormSchema('sign-up');

// Defining types, important in TS
interface CustomInput {
    form: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>, // Know what feild do ew have for name
    label: string,
    password: string,
}

const CustomInput = ({control, name, label, placeholder}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <div className={"form-item"}>
                    <FormLabel className={"form-label"}>
                        {label}
                    </FormLabel>
                    <div className={"flex w-full flex-col"}>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className={"input-class"}
                                // Change the type of input to make sure it is a password
                                type={name === 'password' ? 'password' : 'text'}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className={"form-message mt-2"}/>
                    </div>
                </div>
            )}
        />
    )
}
export default CustomInput
