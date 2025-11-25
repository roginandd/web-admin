import type { VerificationInfoStatus } from "../../types/types";

export interface VerificationInfoResponseDTO {
  verifiactionInfoId: number;
  userIdFK: number;
  frontIdPath: string;
  backIdPath: string;
  insurancePath: string;
  verificationInfoStatus: VerificationInfoStatus;
  createdAt: string;
  updatedAt: string;
}
