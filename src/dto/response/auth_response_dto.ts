import type { Role, VerificationInfoStatus } from "../../types/types";

export interface UserResponseDTO {
  userIdPK: number;
  email: string;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  birthday: string;
  ratingAverage: number;
  totalDeliveries: number;
  createdAt: string;
  updatedAt: string;
  currentRole: Role;
  profilePictureKey: string;
  verifiactionInfoDTO: VerificationInfoResponseDTO;
}

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

export interface TokenResponseDTO {
  token: string;
}
