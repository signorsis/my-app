

import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
//get the verification or forgotPassword token from the request url
// example. http://localhost:3000/verify/$2a$10$5xT2ROQ5PPgtOD3.AnS1fOShBQp9EFgQFiAKpScJhexVSLJLlRTtW
try {
    const reqBody=await request.json();
    const {token}=reqBody;

    console.log(token);
    const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt : Date.now()}}) 
    if(!user)
    {   
         
        return NextResponse.json({message:"user is not found, Invalid Token", status:401})
    }
    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;
    await user.save();
return NextResponse.json({message:"ck"},{status:200})
} 
catch (error:any) {
    console.log(error.message);
    
    return NextResponse.json({error:error.message},{status:400})
}



}


 





