
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, SellerColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface SellerClientProps {
  data: SellerColumn[];
}

export const SellerClient: React.FC<SellerClientProps> = ({
  data
}) => {


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Sellers Data(${data.length})`} description="Manage Sellers for your store" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Sellers" /> */}
      <Separator />
      {/* <ApiList entityName="user" entityIdName="userId"  /> */}
    </>
  );
};