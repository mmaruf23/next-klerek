export type DataDetail = {
  store_id: string;
  user_id: string;
  date_tx: string;
  total_tx: number;
};

export interface DataResponse {
  filename?: string;
  amount?: number;
}

export interface SuccessResponse {
  status: 'success';
  data?: DataDetail[];
}
export interface ErrorResponse {
  status: 'error';
  message?: string;
}

export type ApiResponse = SuccessResponse | ErrorResponse;