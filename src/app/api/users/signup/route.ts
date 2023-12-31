import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import sendEmail from "@/helpers/mailers";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
     
      
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }
    //if it is a new user, hash password and then save to database
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

   const userId=newUser._id;
     const emailType="verifyUser"
     
    //send a mailtrap verfication e-mail using mailer in helper
    await sendEmail({email,userId,emailType});
    //after the mail is sent it sendEmail also updates the user's verification token and date

    return NextResponse.json(
      { message: "user created successfully " },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
