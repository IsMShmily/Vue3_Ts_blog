export type add_score_type = {
  starsNum: number;
};

export type get_score_res = {
  totalStarsCount: number;
  totalStarsSum: number;
  proportion: string;
  isRating: boolean;
  MyStar: number;
};

export type get_score_list_res = {
  starsNum: number;
  count: number;
}[];
