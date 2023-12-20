import { Navigate, Outlet } from 'react-router-dom';
import { Preloader } from '~/shared';
import { useLoading } from '~/shared/store';
import { useUser } from '~/shared/store/useUser';

export const ProtectedRoute = () => {
  const user = useUser((state) => state.user);
  const isLoading = useLoading((state) => state.isLoading);

  return isLoading ? (
    <Preloader />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
