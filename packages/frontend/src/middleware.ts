export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/course/:id/learning/:path*", ],
};
