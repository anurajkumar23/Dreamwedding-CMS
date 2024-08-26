"use client"
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, SellerColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface SellerClientProps {
  data: SellerColumn[];
}

export const SellerClient: React.FC<SellerClientProps> = ({
  data
}) => {
  // const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Sellers Data(${data.length})`} description="Manage Sellers for your store" />
        {/* <Button onClick={() => router.push(`/seller/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Sellers" /> */}
      <Separator />
      {/* <ApiList entityName="user" entityIdName="userId"  /> */}
    </>
  );
};
