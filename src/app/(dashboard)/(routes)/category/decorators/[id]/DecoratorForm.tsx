"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import Image from "next/image";
import GalleryImage from "@/components/Gallery/Gallary";
import Dropzone from "./DropZone";

const formSchema = z.object({
    name: z.string().min(2, "Name is required").max(40),
    innerdescription: z.string().optional(),
    outerdescription: z.string().optional(),
    rating: z.number().min(1, "Rating must be at least 1").max(5).default(4.5),
    location: z.object({
        city: z.string().optional(),
        pincode: z.string().optional(),
        area: z.string().optional(),
    }),
    price: z.array(z.number()).nonempty("At least one price is required"),
    contactUs: z.number().optional(),
    yearOfEstd: z.number().optional(),
    billboard: z.string().max(255).optional(),
    photos: z.array(z.string()).optional(),
});

type DecoratorFormValues = z.infer<typeof formSchema>;

interface DecoratorFormProps {
    initialData: any;
}

const DecoratorForm: React.FC<DecoratorFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Decorator" : "Create Decorator";
    const description = initialData ? "Edit an existing decorator." : "Add a new decorator";
    const toastMessage = initialData ? "Decorator updated." : "Decorator created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<DecoratorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            innerdescription: "",
            outerdescription: "",
            rating: 4.5,
            location: {
                city: "",
                pincode: "",
                area: "",
            },
            price: [1500],
            contactUs: "",
            yearOfEstd: null,
            billboard: "",
            photos: [],
        },
    });

    const onSubmit = async (data: DecoratorFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/decor/${initialData.id}`, data);
            } else {
                await axios.post(`/api/decor`, data);
            }
            router.refresh();
            router.push(`/category/decorators`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/decor/${initialData?.id}`);
            router.refresh();
            router.push(`/category/decorators`);
            toast.success("Decorator deleted.");
        } catch (error: any) {
            toast.error("Make sure to remove all related data first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="text-white flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="md:grid-cols-10 grid gap-4 container">
                        <div className="text-[#b7bac1] md:col-span-4 w-full h-auto relative rounded-lg overflow-hidden mb-5">
                            <FormField
                                control={form.control}
                                name="photos"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Photos</FormLabel>
                                        <FormControl>
                                            {field.value && Array.isArray(field.value) ? (
                                                <>
                                                    <GalleryImage
                                                        photos={field.value}
                                                        category="decorator"
                                                        onChange={(newPhotos) => field.onChange(newPhotos)}
                                                    />
                                                    <Dropzone
                                                        onDrop={(files) => {
                                                            const newImages = Array.from(files).map((file) =>
                                                                URL.createObjectURL(file)
                                                            );
                                                            const updatedPhotos = [...(field.value || []), ...newImages];
                                                            field.onChange(updatedPhotos);
                                                        }}
                                                        onClick={() => document.getElementById("addImageInput").click()}
                                                    />
                                                    <Input
                                                        id="addImageInput"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        multiple
                                                        onChange={(e) => {
                                                            if (e.target.files) {
                                                                const newImages = Array.from(e.target.files).map((file) =>
                                                                    URL.createObjectURL(file)
                                                                );
                                                                const updatedPhotos = [...(field.value || []), ...newImages];
                                                                field.onChange(updatedPhotos);
                                                            }
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <Dropzone
                                                    onDrop={(files) => {
                                                        const newImages = Array.from(files).map((file) =>
                                                            URL.createObjectURL(file)
                                                        );
                                                        field.onChange(newImages);
                                                    }}
                                                    onClick={() => document.getElementById("addImageInput").click()}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="md:grid md:col-span-6 container flex-1 bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1] h-max gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Decorator Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="outerdescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Outer Description</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Outer Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="innerdescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Inner Description</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rating</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Rating" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="yearOfEstd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year Of ESTD.</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="2020" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (Array)</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Price"
                                                            value={item.toString()}  // Convert number to string for input
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                const newValue = parseFloat(e.target.value);  // Convert string to number

                                                                if (!isNaN(newValue)) {  // Check if the new value is a valid number
                                                                    updatedValue[index] = newValue;
                                                                    field.onChange(updatedValue);
                                                                }
                                                            }}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            onClick={() => {
                                                                const updatedValue = (field.value || []).filter((_, i) => i !== index);
                                                                field.onChange(updatedValue);
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        const updatedValue = [...(field.value || []), 0];  // Add a new number (e.g., 0)
                                                        field.onChange(updatedValue);
                                                    }}
                                                >
                                                    Add New
                                                </Button>
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactUs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>contact Us</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="9123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="my-4 container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
                        <FormField
                            control={form.control}
                            name="location.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location.pincode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pincode</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Pincode" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location.area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Area" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default DecoratorForm;
