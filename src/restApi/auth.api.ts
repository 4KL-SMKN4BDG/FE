// src/api/authAPI.ts
// import { reset } from "canvas-confetti";
import apiClient from "./base.api";
import { Role } from "./utils/user";

export interface User {
  id: string;
  name: string;
  nomorInduk: string;
  email: string;

  class: string;
  major: string;
  status: string | null;

  organizationDesc: string | null;
  experienceDesc: string;

  birthPlace: string;
  birthDate: string;
  address: string;
  profilePhoto: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;

  roles: Role[];
}

export interface LoginData {
  user: User;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: LoginData;
}

export interface LoginCredentials {
  nomorInduk: string;
  password: string;
}

export interface ResetPassword{
  newPassword: string;
}

export const loginAPI = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/api/v1/auth/login",

    credentials,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const resetPassword = async (
  newPassword: ResetPassword
): Promise<void> => {
  const token = sessionStorage.getItem("token");
  const response = await apiClient.post(
  "/api/v1/auth/reset-password",
  newPassword,
  {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);
  return response.data;
};

export const refreshTokenAPI = async (
  refreshToken: string
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/api/v1/auth/refresh", {
    refreshToken,
  });
  return response.data;
};
