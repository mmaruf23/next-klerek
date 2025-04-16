import { ContentType } from "@/constants/ContentType";
import { ApiResponse } from "@/types/response";
import axios, { AxiosResponse } from "axios";

export const uploadFile = async (file: File): Promise<ApiResponse> => {

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response: AxiosResponse<ApiResponse> = await axios.post("/api/upload", formData, {
      headers: {
        'Content-Type': ContentType.MULTIPART
      }
    })

    console.log("Upload sukses : " , response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }

    return {
      status: 'error',
      message: "Bad request!"
    }
  }
}