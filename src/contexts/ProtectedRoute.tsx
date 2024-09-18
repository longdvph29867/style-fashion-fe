import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import NotAuthorizedPage from '../components/NotFoundPage/NotAuthorizedPage';

type ProtectedRouteProps = {
    children: JSX.Element;
    allowedRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const authContext = useContext(AuthContext);

    // console.log("authContext", authContext);

    // if (!authContext) {
    //     return <Navigate to="/" replace />;
    // }

    // Nếu authContext không tồn tại hoặc userRole không xác định, chờ cho đến khi có giá trị
    if (!authContext || authContext.userRole === null) {
        return <NotAuthorizedPage />; // Hoặc có thể redirect đến trang login hoặc thông báo
    }

    const { userRole } = authContext;
    // const { userRole } = 'admin';
    // console.log("userRole", userRole);

    if (!allowedRoles.includes(userRole as string)) {
        // return <Navigate to="/" replace />;
        return <NotAuthorizedPage />;
    }

    return children;
};

export default ProtectedRoute;
