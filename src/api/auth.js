import { authApi } from "./axios";

// 로그인 API 호출
export const loginApi = async ({ id, password }) => {
  const response = await authApi.post("/login", { id, password });
  return response.data; // 응답 데이터 반환
};

// 회원가입 API 호출
export const registerApi = async ({ id, password, nickname }) => {
  const response = await authApi.post("/register", { id, password, nickname });
  return response.data; // 응답 데이터 반환
};
