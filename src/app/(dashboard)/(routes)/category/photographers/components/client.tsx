"use client"
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, PhotographerColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface PhotographerClientProps {
  data: PhotographerColumn[];
}

export const PhotographerClient: React.FC<PhotographerClientProps> = ({
  data
}) => {
const router =  useRouter();


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Photographers Data(${data.length})`} description="Manage Photographers for your store" />
        <Button onClick={() => router.push(`/category/photographers/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Photographers" />
      <Separator />
      {/* <ApiList entityName="user" entityIdName="userId"  /> */}
    </>
  );
};
