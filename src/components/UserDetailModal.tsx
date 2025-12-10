"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import toast, { Toaster } from "react-hot-toast";

import type { UserResponseDTO } from "../dto/response/auth_response_dto";
import { formatFullname, VerificationInfoStatusText } from "../utils/utils";
import type { VerificationInfoStatus } from "../types/types";
import { updateVerificationInfoById } from "../services/verification_info";

interface UserDetailModalProps {
  user: UserResponseDTO;
  onClose: () => void;
  onUpdateSuccess?: (status: VerificationInfoStatus) => void; // NEW
}

// --- Modified Component ---
export default function UserDetailModal({
  user,
  onClose,
  onUpdateSuccess,
}: UserDetailModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  // State for the toggle: "credentials" or "resources"
  const [activeTab, setActiveTab] = useState<"credentials" | "resources">(
    "credentials"
  );

  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  // Located near the top of the component logic:

  const handleApprove = async () => {
    await updateVerification(1, user.userIdPK);
  };

  const handleReject = async () => {
    await updateVerification(2, user.userIdPK);
  };

  const updateVerification = async (
    status: VerificationInfoStatus,
    userId: number
  ) => {
    setIsUpdating(true);
    try {
      const response = await updateVerificationInfoById(status, userId);

      toast.success(
        `User ${status === 1 ? "approved" : "rejected"} successfully`
      );
      if (onUpdateSuccess) onUpdateSuccess(response.verificationInfoStatus);

      if (status === 1) setIsAccepting(true);
      else setIsRejecting(true);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update verification");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const status: string =
    VerificationInfoStatusText[user.verifiactionInfoDTO.verificationInfoStatus];

  return (
    <>
      <style global jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar bg-white">
          <CardHeader className="bg-gray-200 text-black mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-black">
                  {formatFullname(
                    user.firstName,
                    user.middleName || "",
                    user.lastName
                  )}
                </CardTitle>

                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
              </div>

              <Badge className={getStatusColor(status)}>{status}</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 text-black">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Username
                </label>
                <p className="mt-1">{user.username}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Applied On
                </label>
                <p className="mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex border-b border-gray-200 ">
              <button
                className={
                  "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors bg-white text-black border-b-2 border-black"
                }
              >
                Resources
              </button>
            </div>
            {/* Tab Content */}
            <div>
              {activeTab === "resources" && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Resource Allocation
                  </label>
                  <p className="mt-2 p-3 bg-gray-100 rounded-md text-sm whitespace-pre-wrap">
                    to be added
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-10">
              <div>
                <label className="text-m font-medium mb-2 block text-black">
                  Front Id
                </label>
                <div className="flex justify-center">
                  <img
                    src={`https://pasabuyres.s3.ap-southeast-2.amazonaws.com/${user.verifiactionInfoDTO.frontIdPath}`}
                    // 🚀 Fixed Size: w-80 (320px) and h-auto to maintain aspect ratio
                    className="w-80 h-auto max-w-full rounded-md shadow-lg"
                    alt="Front ID"
                  ></img>
                </div>
              </div>

              <div>
                <label className="text-m font-medium mb-2 block text-black">
                  Back Id
                </label>
                <div className="flex justify-center">
                  <img
                    src={`https://pasabuyres.s3.ap-southeast-2.amazonaws.com/${user.verifiactionInfoDTO.backIdPath}`}
                    className="w-80 h-auto max-w-full rounded-md shadow-lg"
                    alt="Back ID"
                  ></img>
                </div>
              </div>

              <div>
                <label className="text-m font-medium mb-2 block text-black">
                  Insurance
                </label>
                <div className="flex justify-center">
                  <img
                    src={`https://pasabuyres.s3.ap-southeast-2.amazonaws.com/${user.verifiactionInfoDTO.insurancePath}`}
                    className="w-80 h-auto max-w-full rounded-md shadow-lg"
                    alt="Insurance Document"
                  ></img>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleApprove}
                disabled={isAccepting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isAccepting ? "Approving..." : "Approve"}
              </Button>

              <Button
                onClick={handleReject}
                disabled={isRejecting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {isRejecting ? "Rejecting..." : "Reject"}
              </Button>

              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
