export type add_message_type = {
  content: string;
};

export type get_message_type = {
  page: number;
  size: number;
};

export type get_message_res = {
  total: number;
  records: {
    id: number;
    content: string;
    praise: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
      username: string;
      avatar: string;
    };
  }[];
};
