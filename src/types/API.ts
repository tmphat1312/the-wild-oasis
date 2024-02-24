export interface FilterFieldOption {
  field: string;
  value: string;
}

export interface SortFieldOption {
  field: string;
  order: {
    ascending: boolean;
  };
}
