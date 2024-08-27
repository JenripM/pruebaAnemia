import {  withAuth } from "next-auth/middleware";
import {  } from "next/server";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/((?!images|_next/static|_next/image|favicon.ico|auth/login).*)"],
};
