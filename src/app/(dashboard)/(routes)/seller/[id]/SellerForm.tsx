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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";



const formSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name is required"),
    phoneNumber: z.string().min(10, "Phone number is required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Address is required"),
    pincode: z.number().min(6, "Pincode is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    whatsappNumber: z.string().optional(),
    GSTNO: z.string().min(15, "GST number is required"),
    pancard: z.string().min(10, "PAN number is required"),
    document: z.string().optional(),
    status: z.enum(["Pending", "Approved", "Rejected"]),
    bank: z.object({
        name: z.string().min(2, "Bank name is required"),
        account: z.string().min(10, "Account number is required"),
        ifsc: z.string().min(11, "IFSC code is required"),
        holdername: z.string().min(2, "Account holder's name is required"),
    }),
});

type SellerFormValues = z.infer<typeof formSchema>;

interface SellerFormProps {
    initialData: any;
}

const SellerForm: React.FC<SellerFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Seller" : "Create Seller";
    const description = initialData ? "Edit a seller." : "Add a new seller";
    const toastMessage = initialData ? "Seller updated." : "Seller created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<SellerFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            firstName: "",
            middleName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: "",
            pincode: "",
            city: "",
            state: "",
            whatsappNumber: "",
            GSTNO: "",
            pancard: "",
            document: "",
            status: "",
            bank: {
                name: "",
                account: "",
                ifsc: "",
                holdername: "",
            },
        },
    });

    const onSubmit = async (data: SellerFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/seller/${initialData._id}`, data);
            } else {
                await axios.post(`/api/seller`, data);
            }
            router.refresh();
            router.push(`/sellers`);
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
            await axios.delete(`/api/seller/${initialData._id}`);
            router.refresh();
            router.push(`/sellers`);
            toast.success("Seller deleted.");
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
                                name="document"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Document</FormLabel>
                                        <FormControl>
                                            {field.value ? (
                                                <>
                                                    {field.value.endsWith('.pdf') ? (
                                                        <div className="flex flex-col items-center">
                                                            {/* PDF Preview */}
                                                            <iframe
                                                                src={`/images/seller/${field.value}`}
                                                                className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-lg border mb-2"
                                                                title="PDF Preview"
                                                            />
                                                            <a
                                                                href={`/images/seller/${field.value}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-500 underline mt-2"
                                                            >
                                                                View Full PDF
                                                            </a>
                                                        </div>

                                                    ) : (
                                                        <div className="flex flex-col items-center">
                                                            {/* Image Preview */}
                                                            <Image
                                                                src={`/images/seller/${field.value}`}
                                                                alt="Document"
                                                                width={300}
                                                                height={300}
                                                                className="rounded-lg object-contain mb-2"
                                                            />
                                                            <a
                                                                href={`/images/seller/${field.value}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-500 underline mt-2"
                                                            >
                                                                View Full Image
                                                            </a>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <Input disabled={loading} placeholder="Document" {...field} />
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
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="First name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Middle name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pincode"
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
                                name="city"
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
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="State" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="whatsappNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WhatsApp Number</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="WhatsApp number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="GSTNO"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GST Number</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="GST number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pancard"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PAN Card</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="PAN number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={loading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Approved">Approved</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Separator />

                    <div className="text-[#b7bac1] md:grid md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="bank.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bank Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Bank name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bank.account"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account Number</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Account number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bank.ifsc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>IFSC Code</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="IFSC code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bank.holdername"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account Holder Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Account holder name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default SellerForm;
