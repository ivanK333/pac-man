import { Navigate, Route, RouteProps } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthenticated: boolean;
  element: React.ReactNode;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { element, isAuthenticated } = props;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route element={element} />;
};

export default PrivateRoute;
