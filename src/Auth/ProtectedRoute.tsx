import type { JSX } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [cookies] = useCookies(["role"]);

  const role = cookies.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
