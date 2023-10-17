import { Routes, Route, Navigate } from 'react-router-dom';

import Register from '../../pages/Register/Register';
import Login from '../../pages/LoginPage/LoginPage';
import { ROUTES } from '../../constants/routes';

export const Auth = () => {
  return (
    <Routes>
      <Route path={ROUTES.auth.register} element={<Register />} />
      <Route path={ROUTES.auth.login} element={<Login />} />
      <Route path="/*" element={<Navigate replace to={ROUTES.auth.login} />} />
    </Routes>
  );
};
