"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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


// Zod schema for validation
const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    price: z.number().min(0, "Price must be at least 0"),
    veg: z.object({
        starter: z.array(z.string()).optional(),
        maincourse: z.array(z.string()).optional(),
        desert: z.array(z.string()).optional(),
        welcomedrink: z.array(z.string()).optional(),
        breads: z.array(z.string()).optional(),
        rice: z.array(z.string()).optional(),
    }).optional(),
    nonveg: z.object({
        starter: z.array(z.string()).optional(),
        maincourse: z.array(z.string()).optional(),
        desert: z.array(z.string()).optional(),
        welcomedrink: z.array(z.string()).optional(),
        breads: z.array(z.string()).optional(),
        rice: z.array(z.string()).optional(),
    }).optional(),
    addon: z.object({
        starter: z.array(
            z.object({
                name: z.string(),
                price: z.string(),
            })
        ).optional(),
        maincourse: z.array(
            z.object({
                name: z.string(),
                price: z.string(),
            })
        ).optional(),
        desert: z.array(
            z.object({
                name: z.string(),
                price: z.string(),
            })
        ).optional(),
        welcomedrink: z.array(
            z.object({
                name: z.string(),
                price: z.string(),
            })
        ).optional(),
        breads: z.array(
            z.object({
                name: z.string(),
                price: z.string(),
            })
        ).optional(),
        rice: z.array(
            z.object({
                name: z.string(),
                price: z.string(),
            })
        ).optional(),
    }).optional(),
});

type CatererFormValues = z.infer<typeof formSchema>;

interface CatererFormProps {
    initialData: any;
}

const CatererForm: React.FC<CatererFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Caterer" : "Create Caterer";
    const description = initialData ? "Edit a caterer." : "Add a new caterer";
    const toastMessage = initialData ? "Caterer updated." : "Caterer created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CatererFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            price: 0,
            veg: {
                starter: [],
                maincourse: [],
                desert: [],
                welcomedrink: [],
                breads: [],
                rice: [],
            },
            nonveg: {
                starter: [],
                maincourse: [],
                desert: [],
                welcomedrink: [],
                breads: [],
                rice: [],
            },
            addon: {
                starter: [],
                maincourse: [],
                desert: [],
                welcomedrink: [],
                breads: [],
                rice: [],
            },
        },
    });


    const onSubmit = async (data: CatererFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/caterer/${initialData._id}`, data);
            } else {
                await axios.post(`/api/caterer`, data);
            }
            router.refresh();
            router.push(`/category/caterers`);
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
            await axios.delete(`/api/caterer/${initialData?._id}`);
            router.refresh();
            router.push(`/caterer`);
            toast.success("Caterer deleted.");
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
                    <div className="my-4 md:grid md:grid-cols-2 gap-8 container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Caterer Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Name" {...field} />
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
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Price" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
                        <Heading title="Veg Items" description="Veg Menu Items" />
                        <Separator className="mt-2 mb-2" />
                        <div className="md:grid md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="veg.starter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Starter</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="veg.maincourse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Main Course</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="veg.desert"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Desert</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="veg.welcomedrink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Welcome drink</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="veg.breads"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Breads</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="veg.rice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rice</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                        </div>
                    </div>
                    <div className="container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
                        <Heading title="Non-Veg Items" description="Non-Veg Menu Items" />
                        <Separator className="mt-2 mb-2" />
                        <div className="md:grid md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="nonveg.starter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Starter</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="nonveg.maincourse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Main Course</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="nonveg.desert"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Desert</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="nonveg.welcomedrink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Welcome drink</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="nonveg.breads"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Breads</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                                name="nonveg.rice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rice</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Starter"
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = e.target.value;
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), ''];
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
                        </div>
                    </div>
                    <div className="container bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
                        <Heading title="Add-on Items" description="Add-on Menu Items" />
                        <Separator className="mt-2 mb-2" />
                        <div className="md:grid md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="addon.starter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Starter Add-ons</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Name"
                                                            value={item.name}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], name: e.target.value };
                                                                field.onChange(updatedValue);
                                                            }}
                                                        />
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Price"
                                                            value={item.price}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], price: e.target.value };
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), { name: '', price: '' }];
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
                                name="addon.maincourse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Main-Course Add-ons</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Name"
                                                            value={item.name}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], name: e.target.value };
                                                                field.onChange(updatedValue);
                                                            }}
                                                        />
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Price"
                                                            value={item.price}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], price: e.target.value };
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), { name: '', price: '' }];
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
                                name="addon.desert"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Desert Add-ons</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Name"
                                                            value={item.name}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], name: e.target.value };
                                                                field.onChange(updatedValue);
                                                            }}
                                                        />
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Price"
                                                            value={item.price}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], price: e.target.value };
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), { name: '', price: '' }];
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
                                name="addon.welcomedrink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Welcome Drink Add-ons</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Name"
                                                            value={item.name}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], name: e.target.value };
                                                                field.onChange(updatedValue);
                                                            }}
                                                        />
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Price"
                                                            value={item.price}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], price: e.target.value };
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), { name: '', price: '' }];
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
                                name="addon.breads"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Breads Add-ons</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Name"
                                                            value={item.name}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], name: e.target.value };
                                                                field.onChange(updatedValue);
                                                            }}
                                                        />
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Price"
                                                            value={item.price}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], price: e.target.value };
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), { name: '', price: '' }];
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
                                name="addon.rice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rice Add-ons</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {(field.value || []).map((item, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Name"
                                                            value={item.name}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], name: e.target.value };
                                                                field.onChange(updatedValue);
                                                            }}
                                                        />
                                                        <Input
                                                            disabled={loading}
                                                            placeholder="Price"
                                                            value={item.price}
                                                            onChange={(e) => {
                                                                const updatedValue = [...(field.value || [])];
                                                                updatedValue[index] = { ...updatedValue[index], price: e.target.value };
                                                                field.onChange(updatedValue);
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
                                                        const updatedValue = [...(field.value || []), { name: '', price: '' }];
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
                        </div>
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default CatererForm;
