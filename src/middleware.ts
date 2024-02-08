import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const publicPath = path ==="/login"  || path ==="/signup" || path === "/"
    const token = request.cookies.get("token")?.value || ''
    console.log(token)

    if(token && publicPath){
        return NextResponse.redirect(new URL("/profile", request.nextUrl))  

    }
    else if (! token && !publicPath){
        return NextResponse.redirect(new URL("/login", request.nextUrl))        
    }
}

export const config = {
    matcher : [
        "/", "/login", "/profile", "/signup"
    ]
}

