type SuccessResponse = {
  status: true;
  data: string;
}

type ErrorResponse = {
  status: false;
  message: string;
}

export type ApiResponse = SuccessResponse | ErrorResponse;