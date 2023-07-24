import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user doesn't exist" },
        { status: 400 }
      );
    }
    //check if password match
    const validPassword = await bcryptjs.compare(password,user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "password is incorrect" },
        { status: 400 }
      );
    }
    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      password: user.password,
    };
    //create token
    const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    //set it into theuser cookies
    const response = NextResponse.json({
      message: "login succesfull",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
 