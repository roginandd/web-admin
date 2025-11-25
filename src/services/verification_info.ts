import type { VerificationInfoResponseDTO } from "../dto/response/auth_response_dto";
import type { VerificationInfoStatus } from "../types/types";
import { api } from "./config";

export const updateVerificationInfoById = async (
  verificationInfo: VerificationInfoStatus,
  userId: number
): Promise<VerificationInfoResponseDTO> => {
  try {
    const response = await api.patch(
      `/VerificationInfo/${userId}`,
      verificationInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`verification info: ${verificationInfo}`);
    const { data } = response;

    console.log(response);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
