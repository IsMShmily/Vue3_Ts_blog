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
  token?: string;
  githubId?: number;
};

export type update_userInfo_type = {
  userName?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

export type get_userInfo_res = {
  id: number;
  userName: string;
  avatar: string;
  userType: boolean;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
