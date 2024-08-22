export interface SellerInterface {
    _id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    pincode: number;
    city: string;
    state: string;
    whatsappNumber: string;
    GSTNO: string;
    bank: {
      name: string;
      account: string;
      ifsc: string;
      holdername: string;
    };
    pancard: string;
    document: string;
    userid: string;
    status: "Pending" | "Accepted" | "Rejected";
    Banquets: string[]; // Assuming this is an array of strings, adjust if necessary
    Photographers: string[]; // Assuming this is an array of strings, adjust if necessary
    Decorators: string[]; // Assuming this is an array of strings, adjust if necessary
    Caterers: string[]; // Assuming this is an array of strings, adjust if necessary
    createdAt: Date;

  }
  