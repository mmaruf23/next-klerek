import { HttpMethod } from "@/constants/HttpMethod";
import { HttpStatusCode } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";


export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  if (req.method !== HttpMethod.POST) {
    res.setHeader('allow', [HttpMethod.POST]);
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      message: "aja sendiri"
    })
  }
  


  res.status(HttpStatusCode.Accepted).json({
    data: "Aman bang"
  });
}