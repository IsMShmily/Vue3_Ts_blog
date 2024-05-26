export type get_category_list_type = {
  page: number;
  size: number;
};

export type get_category_list_res = {
  total: number;
  records: {
    id: number;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
