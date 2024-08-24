"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Hourglass } from "lucide-react";
import { toast } from "react-hot-toast";

const statusOptions: Array<"Pending" | "Accepted" | "Rejected"> = [
  "Pending",
  "Accepted",
  "Rejected",
];

interface StatusCellProps {
  initialStatus: "Pending" | "Accepted" | "Rejected";
  sellerId: string;
}

export const StatusCell: React.FC<StatusCellProps> = ({ initialStatus, sellerId }) => {
  const [status, setStatus] = useState<"Pending" | "Accepted" | "Rejected">(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: "Pending" | "Accepted" | "Rejected") => {
    setStatus(newStatus);
    setLoading(true);

    try {
      const response = await fetch(`/api/seller/${sellerId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

      toast.success("Status updated successfully.");
    } catch (error) {
      toast.error("Error updating status.");
    } finally {
      setLoading(false);
    }
  };

  let StatusIcon;
  let statusColor;

  switch (status) {
    case "Pending":
      statusColor = "text-yellow-500";
      StatusIcon = Hourglass;
      break;
    case "Accepted":
      statusColor = "text-green-500";
      StatusIcon = CheckCircle;
      break;
    case "Rejected":
      statusColor = "text-red-500";
      StatusIcon = XCircle;
      break;
    default:
      statusColor = "text-gray-500";
      StatusIcon = Hourglass;
  }

  return (
    <div className={`flex items-center gap-2 ${statusColor}`}>
      <StatusIcon className="w-5 h-5" />
      <select
        className="bg-transparent border-none outline-none cursor-pointer"
        value={status}
        onChange={(e) => handleStatusChange(e.target.value as "Pending" | "Accepted" | "Rejected")}
        disabled={loading}
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusCell;
