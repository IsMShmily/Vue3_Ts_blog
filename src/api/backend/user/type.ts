export type register_type = {
  password: string;
  email: string;
  code: string;
};

export type register_res = {
  id: number;
};

export type login_type = {
  email: string;
  password: string;
};

export type login_res = {
  id: number;
  userName: string;
  userType: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};
