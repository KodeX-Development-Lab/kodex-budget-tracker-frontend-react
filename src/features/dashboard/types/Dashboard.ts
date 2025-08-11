
export type EmployeeListResponse = {
  module_id: number;
  employees: {
    data: ;
    current_page: number;
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
};
