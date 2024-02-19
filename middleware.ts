import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    // Routes that can be accessed while signed out
    publicRoutes: ['/', '/products', '/offers', '/contact', '/product/:id', '/privacy', '/studio/:foo/(.*)' ],
    // Routes that can always be accessed, and have
    // no authentication information
    // ignoredRoutes: ['/studio'],
  });
   
  export const config = {
    // Protects all routes, including api/trpc.
    // See https://clerk.com/docs/references/nextjs/auth-middleware
    // for more information about configuring your Middleware
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };