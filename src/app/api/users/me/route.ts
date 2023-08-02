import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user=await User.findOne({_id: userId}).select("-password");
  
    return NextResponse.json({
        message: 'user found',
        user
    })
  } catch (error:any) {
    return NextResponse.json({
        error: error.message
    })
  }
}
