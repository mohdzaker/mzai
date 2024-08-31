import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const response = NextResponse.json({
            status: 200,
            message: "Logged Out Successfully!"
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message
        });
    }
}