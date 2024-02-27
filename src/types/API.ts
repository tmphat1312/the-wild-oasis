export type FilterFieldOption = {
  field: string;
  value: string;
};

export type SortFieldOption = {
  field: string;
  order: {
    ascending: boolean;
  };
};
