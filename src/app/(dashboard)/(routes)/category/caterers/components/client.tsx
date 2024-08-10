
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, CatererColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface CatererClientProps {
  data: CatererColumn[];
}

export const CatererClient: React.FC<CatererClientProps> = ({
  data
}) => {


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Caterers Data(${data.length})`} description="Manage Caterers for your store" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Caterers" />
      <Separator />
      {/* <ApiList entityName="user" entityIdName="userId"  /> */}
    </>
  );
};
