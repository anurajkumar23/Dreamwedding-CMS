import React from 'react';
import { SellerInterface } from '@/interfaces/seller';
import { Toaster } from 'react-hot-toast';

interface ViewMoreProps {
  data: SellerInterface;
  setIsViewMore: (value: boolean) => void;
  handleStatus: (status: "Pending" | "Accepted" | "Rejected", id: string) => void;
  handlePhoto: (photos: string[]) => void;
  viewPhoto: boolean;
  setViewPhoto: (value: boolean) => void;
  photoarray: string[];
}

export default function ViewMore({
  data,
  setIsViewMore,
  handleStatus,
  handlePhoto,
  viewPhoto,
  setViewPhoto,
  photoarray,
}: ViewMoreProps) {
  return (
    <div>
      {viewPhoto ? (
        // <ViewPhotos photoarray={photoarray} setViewPhoto={setViewPhoto} />
        <div>photo</div>
      ) : (
        <div className="mt-5">
          <div className="flex mb-2">
            <div className="ml-5 w-1/3">
              <p>
                <strong>Name:</strong> {data.firstName} {data.middleName} {data.lastName}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {data.phoneNumber}
              </p>
              <p>
                <strong>City:</strong> {data.city}
              </p>
              <p>
                <strong>State:</strong> {data.state}
              </p>
              <p>
                <strong>Pincode:</strong> {data.pincode}
              </p>
            </div>
            <div className="w-1/3">
              <div className="flex mb-2 ">
                <div className="w-1/2">
                  <strong>GST Number:</strong> {data.GSTNO}
                </div>
                <div className="w-1/2">
                  <strong>PAN Card:</strong> {data.pancard}
                </div>
              </div>
              <div className="flex mb-2 ">
                <div className="w-1/2">
                  <strong>Bank Name:</strong> {data.bank.name}
                </div>
                <div className="w-1/2">
                  <strong>Bank Account:</strong> {data.bank.account}
                </div>
              </div>
              <div className="flex mb-2 ">
                <div className="w-1/2">
                  <strong>Bank IFSC:</strong> {data.bank.ifsc}
                </div>
                <div className="w-1/2">
                  <strong>Account Holder:</strong> {data.bank.holdername}
                </div>
              </div>
              <div className="mb-2">
                <strong>Documents:</strong> <a href={data.document} target="_blank" rel="noopener noreferrer">View Document</a>
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {data.status}
              </div>
              <div>
                <strong>Decision: </strong>
                {data.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleStatus("Accepted", data._id)}
                      className="mb-2 cursor-pointer border-2 ml-5 rounded-lg px-2 py-1 text-green-300 border-green-300 hover:bg-green-400 hover:text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatus("Rejected", data._id)}
                      className="mb-2 cursor-pointer border-2 ml-5 rounded-lg px-2 py-1 text-red-300 border-red-300 hover:bg-red-400 hover:text-white"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="w-1/3 text-center">
              <button
                onClick={() => setIsViewMore(false)}
                className="cursor-pointer border-2 ml-5 rounded-lg px-2 py-1 text-red-300 border-red-300 hover:bg-red-400 hover:text-white"
              >
                Back
              </button>
            </div>
          </div>
          <hr />
          <div className="mt-5">
            <strong>Banquets:</strong>
            <ul>
              {data.Banquets.map((banquet, index) => (
                <li key={index}>{banquet}</li>
              ))}
            </ul>
            <strong>Photographers:</strong>
            <ul>
              {data.Photographers.map((photographer, index) => (
                <li key={index}>{photographer}</li>
              ))}
            </ul>
            <strong>Decorators:</strong>
            <ul>
              {data.Decorators.map((decorator, index) => (
                <li key={index}>{decorator}</li>
              ))}
            </ul>
            <strong>Caterers:</strong>
            <ul>
              {data.Caterers.map((caterer, index) => (
                <li key={index}>{caterer}</li>
              ))}
            </ul>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      )}
    </div>
  );
}
