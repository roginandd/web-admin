import type { LoginRequestDTO } from "../dto/request/auth_request_dto";
import type { TokenResponseDTO } from "../dto/response/auth_response_dto";
import { api } from "../services/config";

export const loginUser = async (
  userRequest: LoginRequestDTO
): Promise<TokenResponseDTO> => {
  try {
    const { username, password } = userRequest;

    if (!username.trim() || !password.trim())
      throw new Error("Empty Credentials");
    
    const response = await api.post(`/Authentication/login`, userRequest);

    console.log(`RECEIVED TOKEN: ${response.data.token}`);
    return response.data;
  } catch (err: any) {
    console.error(err);
    alert("Unauthorized Access");

    throw err;
  }
};
