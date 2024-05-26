export type get_blogs_list_type = {
  categoryId: number | null;
  page: number;
  size: number;
};

export type get_blogs_list_res = {
  total: number;
  records: {
    id: number;
    title: string;
    brief: string;
    praise: number;
    thumbnail: string;
    description: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
