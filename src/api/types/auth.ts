export type UserData = {
  id: number;
  name: string;
  username: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type User = {
  accessToken: string;
  data: UserData;
  expiresAt: number;
  refreshToken: string;
  success: boolean;
};
