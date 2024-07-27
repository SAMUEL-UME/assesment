import { NextResponse, NextRequest } from 'next/server'

export const GET = (request: Request)=> {
    return NextResponse.redirect(new URL('/api/blogs', request.url))
}
