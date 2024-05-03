import { useEffect, useState } from "react";

const IsLogged = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return <div></div>;
};

export default IsLogged;
