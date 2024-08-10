
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, PhotographerColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface PhotographerClientProps {
  data: PhotographerColumn[];
}

export const PhotographerClient: React.FC<PhotographerClientProps> = ({
  data
}) => {


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Decorators Data(${data.length})`} description="Manage Decorators for your store" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Decorators" />
      <Separator />
      {/* <ApiList entityName="user" entityIdName="userId"  /> */}
    </>
  );
};
