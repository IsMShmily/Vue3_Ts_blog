export type get_blogs_list_type = {
  categoryId: number | null;
  page: number;
  size: number;
  userId?: number | null;
};

export type get_blogs_list_res = {
  total: number;
  records: {
    id: number;
    title: string;
    brief: string;
    praise: number;
    thumbnail: string;
    createdAt: string;
    browse: number;
    isLike: boolean;
  }[];
};

export type blogs_detail_res = {
  id: number;
  title: string;
  brief: string;
  praise: number;
  browse: number;
  thumbnail: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  isLike: boolean;
};

export type list_blogs_res = {
  code: number;
  msg: string;
  data: null;
};
