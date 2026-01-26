import { AddBankAccount } from "@/type/bankaccount";

export interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  permission: Permission[];
}

export interface Division {
  id: string;
  name: string;
  Code: string;
  description: string;
}
export interface HirarkyLevel {
  id: string;
  hirarkyId: string;
  sequence: number;
  requiredRole: string;
  approverId: string;
  createdAt: string;
  approver: Approver;
}

export interface Approver {
  id: string;
  fullName: string;
}

export interface Hirarky {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  levels: HirarkyLevel[];
}

export interface Permission {
  id: string;
  roleId: string;
  label: string;
  subLabel: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  created_at: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneWA: string;
  nik: number;
  signature: string | null;
  status: string | null;
  createdAt: string;
  divisionId: string;
  hirarkyId: string;
  roles: Role[];
  hirarky: Hirarky;
  division: Division;
  bankAccount: AddBankAccount[];
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: User;
}

// src/restApi/utils/user.ts

export interface ListUsersData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: User[];
}

export interface ListUsersResponse {
  status: boolean;
  message: string;
  data: ListUsersData;
}

export interface RoleReq {
  roles: string[];
}

export interface HirarkyReq {
  hirarkyId: string | undefined;
}
