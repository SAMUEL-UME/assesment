const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'
import User from "@/lib/modals/user";
import { SECRET } from "@/lib/config/config";


export function authMiddleware(req: Request): any {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token) {
        jwt.verify(token, SECRET, async (error:any, decodedToken:any) => {
            if (error) {
                return { isValid: false };
              } else{
                const user = await User.findById(decodedToken.id)
                return { isValid: true };
              }
            })
        } else{
            return { isValid: false };
        }
  }