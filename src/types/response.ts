export interface DataResponse {
  filename?: string;
  amount?: number;
}

export interface SuccessResponse {
  status: 'success';
  data?: unknown[];
}
export interface ErrorResponse {
  status: 'error';
  message?: string;
}

export type ApiResponse = SuccessResponse | ErrorResponse;