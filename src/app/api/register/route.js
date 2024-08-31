import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectToDb();
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({
                status: 400,
                message: "All fields are required!"
            });
        }

        const existingUser = await User.findOne({ email: email });

        if(existingUser){
            return NextResponse.json({
                status: 400,
                message: "Email is already registered!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname: name,
            email,
            password: hashedPassword
        });

        try{
            await newUser.save();
            return NextResponse.json({
                status: 200,
                message: "Signup was Successfully!"
            });
        }catch(error){
            return NextResponse.json({
                status: 500,
                message: "Something went wrong!"
            });
        }

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

export async function GET(req) {
    return NextResponse.json({
        status: 405,
        message: "Method Not Allowed. Use POST for registration."
    });
}
