export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/course/:path*", "/home/:path*", "/admin/:path*", "/course/:id/learning/:path*", ],
};
