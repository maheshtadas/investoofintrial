import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProductsRoute = createRouteMatcher(["/products(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the user is not logged in and trying to access a protected route, redirect to sign-in
  if (!userId && (isAdminRoute(req) || isProductsRoute(req))) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If user is logged in, and trying to access /admin, user must have 'admin' role
  if (isAdminRoute(req)) {
    // In this version, roles should be handled outside the session, maybe through custom claims or elsewhere
    // You could check for roles here based on another method if needed (e.g., custom claims).
    const hasAdminRole = false; // Replace with logic to check roles or use an API

    if (hasAdminRole) {
      return NextResponse.next();
    } else {
      const url = req.nextUrl.clone();
      url.pathname = "/not-found";
      return NextResponse.redirect(url);
    }
  }

  // If accessing /products, any signed-in user is allowed
  if (isProductsRoute(req)) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
