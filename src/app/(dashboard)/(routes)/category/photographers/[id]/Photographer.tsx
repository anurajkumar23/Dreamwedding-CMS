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
  locationUrl: z.string().url().optional(),
  price: z.array(z.number()).nonempty("At least one price is required"),
  contactUs: z.number().optional(),
  yearOfEstd: z.number().optional(),
  services: z.array(z.string()).optional(),

  occasion: z.string().min(2, "Occasion is required"),
});

type PhotographerFormValues = z.infer<typeof formSchema>;

interface PhotographerFormProps {
  initialData: any;
}

const PhotographerForm: React.FC<PhotographerFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(initialData?.rating || 4.5);
  const [billboard, setBillboard] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const title = initialData ? "Edit Photographer" : "Create Photographer";
  const description = initialData
    ? "Edit an existing photographer."
    : "Add a new photographer";
  const toastMessage = initialData
    ? "Photographer updated."
    : "Photographer created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<PhotographerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      innerdescription: "",
      outerdescription: "",
      // rating: 4.5,
      location: {
        city: "",
        pincode: "",
        area: "",
      },
      locationUrl: "",
      price: [1500],
      contactUs: "",
      yearOfEstd: null,
      services: [],
      occasion: "",
    },
  });

  const onSubmit = async (data: PhotographerFormValues) => {
    console.log(data, "photographer");

    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      setLoading(true);

      // Create FormData and append form fields
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === "location" && typeof value === "object" && value !== null) {
          // Convert location object to a JSON string and append it
          formData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, String(item))); // Convert each item to a string
        } else {
          formData.append(key, String(value)); // Convert value to a string
        }
      }

      // Append the billboard file to the FormData
      if (billboard) {
        formData.append("billboard", billboard);
      }

      if (initialData) {
        await axios.patch(
          `http://localhost:3000/api/photographer/${initialData._id}`,
          formData,
          config
        );
      } else {
        await axios.post(
          `http://localhost:3000/api/photographer`,
          formData,
          config
        );
      }

      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onRatingSubmit = async () => {
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);

      // Ensure Decorator is defined correctly
      const response = await axios.patch(
        `http://localhost:3000/api/adminRating/${initialData._id}?name=Photographer`,
        { adminRating: rating },
        config
      );

      // Check if response is successful
      if (response.status === 200) {
        toast.success("Rating updated successfully.");
      } else {
        toast.error("Failed to update rating.");
      }
    } catch (error: any) {
      console.error("Error updating rating:", error); // Log error for debugging
      toast.error("Failed to update rating.");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:3000/api/photographer/${initialData?.id}`,
        config
      );
      router.refresh();
      router.push(`/category/photographers`);
      toast.success("Photographer deleted.");
    } catch (error: any) {
      toast.error("Make sure to remove all related data first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBillboard(file);

    // Generate a preview if the file is selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Convert the file to a data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setPreview(null); // Reset preview if no file is selected
    }
  };


  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
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
      <Separator className="mb-4 my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid-cols-10 grid gap-4 container ">
            <div className="md:grid md:col-span-6 container flex-1 bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1] h-max gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photographer Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div><h1>Current Billboard Image</h1>
              <Image src={`/images/photographer/${initialData.billboard}`} width={500} height={500}  alt="Current Billboard Preview"  style={{ maxWidth: "100px", maxHeight: "100px" }}/>
              </div>
              <label>Billboard</label>
              <input
                type="file"
                name="billboard"
                onChange={handleFileChange}
              />
              {preview && (
                <div style={{ marginTop: "10px" }}>
                  <Image
                    width={500}
                    height={500}
                    src={preview}
                    alt="Billboard Preview"
                    style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust the styles as needed
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name="outerdescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outer Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Outer Description"
                        {...field}
                      />
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
                      <Input
                        disabled={loading}
                        placeholder="Inner Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>occasion</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="occasion"
                        {...field}
                      />
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
                      <div className="space-y-4">
                        {(field.value || []).map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              disabled={loading}
                              placeholder="Price"
                              value={item.toString()} // Convert number to string for input
                              onChange={(e) => {
                                const updatedValue = [...(field.value || [])];
                                const newValue = parseFloat(e.target.value); // Convert string to number

                                if (!isNaN(newValue)) {
                                  // Check if the new value is a valid number
                                  updatedValue[index] = newValue;
                                  field.onChange(updatedValue);
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const updatedValue = (field.value || []).filter(
                                  (_, i) => i !== index
                                );
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
                            const updatedValue = [...(field.value || []), 0]; // Add a new number (e.g., 0)
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
          <div className="my-4 container gap-8 bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1] md:grid-cols-2 grid">
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
          </div>
          <div className="md:grid gap-8 my-4 container  bg-slate-800 p-5 rounded-lg font-bold text-[#b7bac1]">
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Services</FormLabel>
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
                              const updatedValue = (field.value || []).filter(
                                (_, i) => i !== index
                              );
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
                          const updatedValue = [...(field.value || []), ""];
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
                    <Input
                      disabled={loading}
                      placeholder="Pincode"
                      {...field}
                    />
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
            <FormField
              control={form.control}
              name="locationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>locationUrl</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="locationUrl"
                      {...field}
                    />
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
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white">
          Update Admin Rating (Range:1 to 5)
        </h2>
        <h2 className="text-xl font-bold text-white">
          Type 1 to Delete the Rating{" "}
        </h2>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onRatingSubmit();
            }}
            className="space-y-4"
          >
            <FormItem>
              <FormLabel className="text-gray-500">Admin Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  disabled={loading}
                  placeholder="Enter new rating (1-5)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <Button type="submit" disabled={loading} className="bg-gray-500">
              Update Rating
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PhotographerForm;
