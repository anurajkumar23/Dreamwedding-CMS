"use client"
import React, { useState } from 'react';
import { SellerInterface } from '@/interfaces/seller';
import { Toaster } from 'react-hot-toast';

interface PendingblockProps {
  data: SellerInterface[];
}

const Pendingblock: React.FC<PendingblockProps> = ({ data }) => {
  const [isViewMore, setIsViewMore] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <p className="text-xl font-semibold uppercase">
        NO PENDING SELLERS FOUND
      </p>
    );
  }

  function handleClick(index: number) {
    setIsViewMore(isViewMore === index ? null : index);
  }

  return (
    <div>
      {data.map((item, index) => (
        <div
          className="flex justify-between h-[5rem] border-2 rounded-xl px-3 text-center mx-1 my-2 bg-slate-100"
          key={index}
        >
          <div className="my-auto mr-2 w-[10rem]">
            <p className="uppercase text-lg">Name</p>
            <p>
              {item.firstName} {item.lastName}
            </p>
          </div>
          <div className="my-auto mr-2 w-[15rem]">
            <p className="uppercase text-lg">Email</p>
            <p>{item.email}</p>
          </div>
          <div className="my-auto mr-2 w-[15rem]">
            <p className="uppercase text-lg">Phone</p>
            <p>{item.phoneNumber}</p>
          </div>
          <div className="my-auto mr-2 w-[28rem]">
            <p className="uppercase text-lg">Address</p>
            <p style={{ maxWidth: '30rem', wordWrap: 'break-word' }}>
              {item.address}, {item.city}, {item.state}, {item.pincode}
            </p>
          </div>
          <div className="my-auto mr-2">
            <p className="uppercase text-lg">Status</p>
            <p>{item.status}</p>
          </div>
          <div className="my-auto mr-2">
            <button
              onClick={() => handleClick(index)}
              className="cursor-pointer border-2 rounded-lg px-2 py-1 text-green-300 border-green-300 hover:bg-green-400 hover:text-white"
            >
              View More
            </button>
          </div>
          {isViewMore === index && (
            <div className="w-full mt-4">
              {/* Additional seller details can be added here */}
              <p>GST No: {item.GSTNO}</p>
              <p>PAN Card: {item.pancard}</p>
              <p>Bank: {item.bank.name}</p>
            </div>
          )}
        </div>
      ))}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Pendingblock;
