import Login from "../components/Login";
import { Navigate } from "react-router-dom";
import getCookie from "../constants/getCookie";

export default function LoginPage() {
  if (getCookie("email") !== "") {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
}
