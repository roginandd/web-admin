import type { UserResponseDTO } from "../dto/response/auth_response_dto";
import type { VerificationInfoStatus } from "../types/types";
import { api } from "./config";

export const getCurrentProfile = async (): Promise<UserResponseDTO> => {
  try {
    const response = await api.get<UserResponseDTO>(`/Users/profile`, {});

    console.log(`PROFILE: ${JSON.stringify(response)}`);

    const { data } = response;

    return data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const getAllUsers = async (): Promise<UserResponseDTO[]> => {
  try {
    const response = await api.get<UserResponseDTO[]>("/Users", {});

    console.log(`USERS: ${JSON.stringify(response.data)}`);

    return response.data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
