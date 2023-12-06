// auth/ceklogin.js
const checkLoggedInUser = () => {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      // User is logged in, return user data
      return user;
    } else {
      // User is not logged in
      return null;
    }
  };
  
  export default checkLoggedInUser;
  