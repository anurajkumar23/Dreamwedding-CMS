"use client";

import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return ( 
    <div className="flex items-center justify-center min-h-screen w-full">
      <Loader />
    </div>
   );
}
 
export default Loading;