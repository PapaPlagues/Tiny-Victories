import { Navigate, Outlet } from "react-router";
import{ jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login/" replace />;
    }

    let isValid = true;

    try {
        const decoded = jwtDecode(token);
        const now = Date.now();
        const isExpired = decoded.exp * 1000 < now;

        if (isExpired || decoded.role !== "ADMIN") {
            isValid = false;
        }
    } catch (err) {
        isValid = false;
        console.error(err);
    }

    if (!isValid) {
        localStorage.removeItem("token");
        return <Navigate to="/login/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;