"use client"

import { SetStateAction, useState } from "react"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

import { useElementStore } from "@/hooks/element"
import { useFillColorStore } from "@/hooks/fill-color"
import { useStrokeColorStore } from "@/hooks/stroke-color"
import { useImageStore } from "@/hooks/image"
import { useImageProperties } from "@/hooks/image-properties"

import { PropertiesFormSchema } from "@/lib/schema"

const RightSidePanel = () => {
    const { element } = useElementStore()
    const { setFillColor } = useFillColorStore();
    const { setStrokeColor } = useStrokeColorStore();
    const { setGrayscale, setBrightness } = useImageProperties();
    const setImage = useImageStore((state) => state.setImage);

    const [brightnessValue, setBrightnessValue] = useState(0.1);

    const form = useForm<z.infer<typeof PropertiesFormSchema>>({
        resolver: zodResolver(PropertiesFormSchema),
        defaultValues: {
            fillcolor: "",
            strokecolor: "",
            grayscale: "average",
            brightness: [brightnessValue]
        },
    })
    return (
        <div className='flex justify-center w-1/4 border-l-2'>
            <Form {...form}>
                <form className="flex flex-col gap-2 w-3/4 space-y-1">
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
                    {
                        element === 'image' && (
                            <>
                                <h1 className="text-xl font-bold">Image Properties</h1>
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    id="picture"
                                                    type="file"
                                                    onChange={(e) => {
                                                        field.onChange(e.target.files);
                                                        const file = e.target.files && e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = () => {
                                                                if (typeof reader.result === 'string') {
                                                                    setImage(reader.result);
                                                                } else {
                                                                    console.error('FileReader result is not a string');
                                                                }
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }

                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="grayscale"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Grayscale</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setGrayscale(value);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl className='my-5'>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a position" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="average">average</SelectItem>
                                                    <SelectItem value="lightness">lightness</SelectItem>
                                                    <SelectItem value="luminosity">luminosity</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="brightness"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <div className='flex items-center gap-3'>
                                                <FormLabel>Brightness</FormLabel>
                                                <span className='border px-2 rounded'>
                                                    {brightnessValue}
                                                </span>
                                            </div>
                                            <Slider
                                                className='my-5'
                                                onValueChange={(value: number[]) => {
                                                    setBrightnessValue(value[0]);
                                                    setBrightness(value[0])
                                                    field.onChange(value);
                                                }}
                                                min={0}
                                                max={0.9}
                                                step={0.1}
                                                defaultValue={[brightnessValue]}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    }
                </form>
            </Form>
        </div>
    )
}

export default RightSidePanel