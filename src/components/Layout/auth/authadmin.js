// middleware/auth.js
import { authenticateUser } from "./cekadmin";

export const withAdminAuth = (handler) => {
  return async (req, res) => {
    // Perform your authentication or authorization check here
    const user = authenticateUser();

    if (!user || user.role !== 'admin') {
      res.writeHead(302, {
        Location: '/login', // Redirect to the login page if not authenticated
      });
      res.end();
      return;
    }

    // If the user is authenticated and authorized, proceed to the handler
    return handler(req, res);
  };
};
