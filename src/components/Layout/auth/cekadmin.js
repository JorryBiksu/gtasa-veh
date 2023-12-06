// auth.js
import checkLoggedInUser from "./ceklogin";

export const authenticateUser = () => {
  const user = checkLoggedInUser();
  return user;
};
