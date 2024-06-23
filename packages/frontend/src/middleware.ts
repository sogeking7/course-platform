export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // "/",
    // "/course/:path*",
    "/home/profile",
    "/home/my-courses",
    "/home/my-exams/:path*",
    "/admin/:path*",
    "/course/:id/learning/:path*",
  ],
};
