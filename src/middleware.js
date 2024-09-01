import { NextRequest, NextResponse } from "next/server";

export function middleware(request){
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/signup" || path === "/signin";

    const token = request.cookies.get("token")?.value || "";

    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/signin", request.nextUrl))
    }
}

export const config = {
    matcher: [
        "/",
        "/dashboard",
        "/signup",
        "/signin",
        "/chat/:path*"
    ]   
}