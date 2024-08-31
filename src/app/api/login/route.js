import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectToDb();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                status: 400,
                message: "All fields are required!"
            });
        }

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return NextResponse.json({
                status: 400,
                message: "Email is not registered!"
            });
        }

        let checkPassword = await bcrypt.compare(password, existingUser.password);

        if (!checkPassword) {
            return NextResponse.json({
                status: 400,
                message: "Incorrect Password!"
            });
        }
        const token = await jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            status: 200,
            message: "Signed in Successfully!",
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

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