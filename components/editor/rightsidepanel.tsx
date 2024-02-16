"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFillColorStore } from "@/hooks/fill-color"
import { useStrokeColorStore } from "@/hooks/stroke-color"

const FormSchema = z.object({
    fillcolor: z.string(),
    strokecolor: z.string()
})

const RightSidePanel = () => {

    const { setFillColor } = useFillColorStore();
    const { setStrokeColor } = useStrokeColorStore();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fillcolor: "",
            strokecolor: ""
        },
    })
    return (
        <div className='flex justify-center w-1/4 border-l-2'>
            <Form {...form}>
                <form className="flex flex-col gap-2 w-3/4 space-y-6">
                    <FormField
                        control={form.control}
                        name="fillcolor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fill Color</FormLabel>
                                <FormControl>
                                    <Input
                                        type="color"
                                        placeholder="Select Color"
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setFillColor(e.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="strokecolor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stroke Color</FormLabel>
                                <FormControl>
                                    <Input
                                        type="color"
                                        placeholder="Select Color"
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setStrokeColor(e.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}

export default RightSidePanel