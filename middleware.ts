// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPages = ["/", "/staff"];

export function middleware(request: NextRequest) {
  if (protectedPages.find((page) => page === request.nextUrl.pathname)) {
    const token = request.cookies.get("MEDI_RECORD_ACCESS_TOKEN");
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
