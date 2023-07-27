import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
// config mathcer
export const config = {

 matcher: [
    '/',
    '/login',
    '/signup',
    '/profile'
]
};

export async function  middleware (request: NextRequest) 
{
    const path= request.nextUrl.pathname;
    const isPublic=path==="/login" || path==="/signup"

    const token=request.cookies.get('token')?.value || "";
    //console.log(decoded);
    
    
  if(isPublic && token)
  {   
      
     
      
    return NextResponse.redirect(new URL( '/profile', request.nextUrl))
  }
  if(!isPublic && !token)
  { 
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
  
}

//export middleware