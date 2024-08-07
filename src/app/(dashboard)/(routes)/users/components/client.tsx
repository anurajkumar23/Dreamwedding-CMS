
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, UserColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface UserClientProps {
  data: UserColumn[];
}

export const UserClient: React.FC<UserClientProps> = ({
  data
}) => {


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Users Data(${data.length})`} description="Manage User for your store" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for User" />
      <Separator />
      <ApiList entityName="user" entityIdName="userId"  />
    </>
  );
};
