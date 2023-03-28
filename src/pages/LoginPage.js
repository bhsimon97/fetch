import Login from "../components/Login";
import { Navigate } from "react-router-dom";
import getCookie from "../constants/getCookie";

export default function LoginPage() {
  if (getCookie("email") !== "") {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <>
        <div className="max-w-md w-full space-y-8">
          <div
            style={{
              marginTop: 30 + "%",
            }}
          >
            <h1 className="text-3xl">Login to Pet Adoption Site</h1>
            <Login />
          </div>
        </div>
      </>
    );
  }
}
