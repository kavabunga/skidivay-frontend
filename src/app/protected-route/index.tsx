import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '~/shared/store/useUser';

export const ProtectedRoute = () => {
  const user = useUser((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/" replace />;
};
