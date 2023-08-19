import { Routes, Route, Navigate } from 'react-router';

import Register from '../../pages/Register/Register';
import { ROUTES } from '../../constants/routes';

export const Auth = () => {
  return (
    <Routes>
      <Route path={ROUTES.auth.register} element={<Register />} />
      <Route path={ROUTES.auth.login} element={<div>Login</div>} />
      <Route
        path="/*"
        element={<Navigate replace to={ROUTES.error.notFound} />}
      />
    </Routes>
  );
};
