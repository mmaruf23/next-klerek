import { HttpMethod } from "@/constants/HttpMethod";
import { HttpStatusCode } from "axios";
import formidable from "formidable";
import fs from 'fs';
import AdmZip from "adm-zip";
import type { NextApiRequest, NextApiResponse } from "next";
import { DataDetail, ErrorResponse, SuccessResponse } from "@/types/response";
import path from "path";
import Database from "better-sqlite3";


export const config = {
  api: {
    bodyParser: false,
  }
}



export default async function handler(req:NextApiRequest, res: NextApiResponse<SuccessResponse | ErrorResponse>) {
  if (req.method !== HttpMethod.POST) {
    res.setHeader('allow', [HttpMethod.POST]);
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      status: "error",
      message: "aja sendiri"
    })
  }
  
  const form = formidable({multiples: true});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(HttpStatusCode.InternalServerError).json({
        status: "error",
        message: "Gagal parsing file"
      })
      
    }

    const uploadedFile = files.file ? files.file[0] : null;

    if (!uploadedFile) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: "error",
        message: "No file uploaded!"
      })
    } 

    const zipBuffer = fs.readFileSync(uploadedFile.filepath);
    const zip = new AdmZip(zipBuffer);

    const dbEntry = zip.getEntries().find(e => e.name.endsWith('.db'));
    
    if (!dbEntry) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: 'error',
        message: 'Invalid file content'
      })
    }

    const dbBuffer = dbEntry.getData();
    const tempPath = path.join('/tmp', 'temp.db')
    fs.writeFileSync(tempPath, dbBuffer);
    const db = new Database(tempPath);
    const result = db.prepare("SELECT store_id, user_id, date_tx, SUM(cash-change_pay) as total_tx from tx_tsale group by date_tx, user_id order by date_tx desc").all() as DataDetail[];
    
    res.status(HttpStatusCode.Ok).json({
      status: 'success',
      data: result
    })

  }) 
}