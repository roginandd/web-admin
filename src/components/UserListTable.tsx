import { MoreVertical } from "lucide-react";
("use client");

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { UserResponseDTO } from "../dto/response/auth_response_dto";
import { formatFullname, VerificationInfoStatusText } from "../utils/utils";
import { useState } from "react";
import { useAuthStore } from "../stores/auth_store";

export interface SignupUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: "approved" | "rejected" | "pending";
  createdAt: string;
  notes?: string;
  credentials?: string;
}
interface UsersListTableProps {
  users: UserResponseDTO[];
  onSelectUser: (user: UserResponseDTO) => void;
}

export default function UsersListTable({
  users,
  onSelectUser,
}: UsersListTableProps) {
  const [isItemHovered, setIsItemHovered] = useState(false);

  // Class string for the background change
  const contentClassName = `bg-white ${
    isItemHovered ? "bg-gray-100" : ""
  } transition-colors`;
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden max-w-[90%]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
              ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
              Full Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
              Username
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
              Email
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
              Status
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(
              (u) => u.userIdPK !== useAuthStore.getState().user?.userIdPK
            )
            .sort((a, b) => a.userIdPK - b.userIdPK)
            .map((user, index) => (
              <tr
                key={user.userIdPK}
                className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {user.userIdPK}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {formatFullname(
                    user.firstName,
                    user.middleName || "",
                    user.lastName
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-center">
                  <Badge
                    className={`${getStatusColor(
                      VerificationInfoStatusText[
                        user.verifiactionInfoDTO.verificationInfoStatus
                      ]
                    )} capitalize`}
                  >
                    {
                      VerificationInfoStatusText[
                        user.verifiactionInfoDTO.verificationInfoStatus
                      ]
                    }
                  </Badge>
                </td>

                <td className="px-6 py-4 text-center">
                  <DropdownMenu>
                    {/* ... DropdownMenuTrigger (Button with MoreVertical icon) */}
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    {/* 2. Apply the dynamic class name */}
                    <DropdownMenuContent
                      align="end"
                      className={`${contentClassName}`}
                    >
                      <DropdownMenuItem
                        onClick={() => onSelectUser(user)}
                        onMouseEnter={() => setIsItemHovered(true)}
                        onMouseLeave={() => setIsItemHovered(false)}
                        // IMPORTANT: Remove any background classes from the item itself
                        className="cursor-pointer flex justify-center"
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">
            No applications found
          </p>
        </div>
      )}
    </div>
  );
}
