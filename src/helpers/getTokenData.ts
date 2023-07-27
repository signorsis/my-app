import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';
export const getTokenData=(request:NextRequest)=>{
   try {
    const token=request.cookies.get("token")?.value || '';

    const decoded:any=jwt.verify(token , process.env.TOKEN_SECRET!);
    const userId=decoded.id;
    return userId;
   } catch (error:any) {
      console.log(error.message);
      
      
   }
    
    





}