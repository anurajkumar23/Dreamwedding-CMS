"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusCellProps {
  role: string;
  userId: string;
}

export const StatusCell: React.FC<StatusCellProps> = ({ role, userId }) => {
  const [status, setStatus] = useState<string>(role);
  const [loading, setLoading] = useState(false);
  const [roleOptions, setRoleOptions] = useState<Array<string>>([]);

  useEffect(() => {
    // Fetch user roles from backend
    const fetchRoleOptions = async () => {
      try {
        const response = await axios.get(`/api/users`);
        const data = response.data;

        // Extract unique roles from data.users
        const roles = data.data.users.map((user: any) => user.role);
        setRoleOptions(Array.from(new Set(roles))); // Remove duplicates
      } catch (error) {
        toast.error("Failed to load role options.");
      }
    };

    fetchRoleOptions();
  }, []);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    setLoading(true);

    try {
      await axios.patch(`/api/users/${userId}`, { role: newStatus });
      toast.success("Role updated successfully.");
    } catch (error) {
      toast.error("Error updating role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        disabled={loading}
        onValueChange={handleStatusChange}
        value={status}
        defaultValue={status}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roleOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusCell;
