import { Route, Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  if (localStorage.getItem("token")) {
    return  <Route {...props} />;
  } else {
    return <Navigate replace to="/login" />;
  }
}
export default ProtectedRoute;