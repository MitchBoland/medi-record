// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPages = ["/", "/staff", "/customer"];

const openPages = ["/signin"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("MEDI_RECORD_ACCESS_TOKEN");
  if (token) {
    if (openPages.find((page) => page === request.nextUrl.pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (!token) {
    if (protectedPages.find((page) => page === request.nextUrl.pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
