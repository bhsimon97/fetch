import Table from "../components/Table";
import { Navigate } from "react-router-dom";
import getCookie from "../constants/getCookie";

export default function Dashboard() {
  if (getCookie("email") === "") {
    return <Navigate to="/" />;
  } else {
    return <Table />;
  }
}
