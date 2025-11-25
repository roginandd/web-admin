"use client";

import { useEffect, useRef, useState } from "react";

import { Input } from "..//components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import UsersListTable from "./UserListTable";
import { Search, Download, FileJson } from "lucide-react";
import type { SignupUser } from "./UserListTable";
import UserDetailModal from "./UserDetailModal";
import type { UserResponseDTO } from "../dto/response/auth_response_dto";
import { getAllUsers } from "../services/user";
import { VerificationInfoStatusText } from "../utils/utils";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(
    null
  );
  const hasFetchedRef = useRef(false);
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<UserResponseDTO[]>([]);

  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const fetchAllUser = async (): Promise<UserResponseDTO[]> => {
    try {
      const response = await getAllUsers();
      if (response) setUsers([...response]);
      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  // call the fetch all user
  useEffect(() => {
    // Only execute the fetch if the ref is false
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true; // Mark as executed

      fetchAllUser();
    }
  }, []);

  const handleUpdateSuccess = () => {
    fetchAllUser();
  };
  useEffect(() => {
    console.log(query);
    console.log(filter);
  }, [query, filter]);

  const filteredUsers = users.filter((user) => {
    const queryLower = query.toLowerCase();
    const matchesQuery =
      user.firstName.toLowerCase().includes(queryLower) ||
      user.lastName.toLowerCase().includes(queryLower) ||
      user.middleName?.toLowerCase().includes(queryLower);

    const status =
      VerificationInfoStatusText[
        user.verifiactionInfoDTO.verificationInfoStatus
      ].toLowerCase();

    const matchesStatus = filter === "all" || status === filter;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 w-screen">
      <Toaster position="top-right" />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 ">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Applications
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Manage and verify user applications
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 ">
          {/* Filters and Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8 max-w-[90%]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, or company..."
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <Select
                value={filter}
                onValueChange={(value: any) => {
                  setFilter(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <UsersListTable
            users={filteredUsers}
            onSelectUser={setSelectedUser}
          />{" "}
        </div>
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
