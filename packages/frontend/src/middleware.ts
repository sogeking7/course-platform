export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // "/",
    // "/course/:path*",
    "/home/profile",
    "/admin/:path*",
    "/course/:id/learning/:path*",
  ],
};
