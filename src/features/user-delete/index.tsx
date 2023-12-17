import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteUserForm, deleteUser } from '~/features';
import { IDeleteUserRequest, IPopupProps } from '~/shared';
import { UserDeletePopup } from '~/entities';
import { useUser } from '~/shared/store/useUser';
import { useMessages } from '~/shared/store';

export const DeleteUser: FC<IPopupProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const user = useUser((state) => state.user);
  const addSuccessMessage = useMessages((state) => state.addSuccessMessage);
  const clearMessages = useMessages((state) => state.clearMessages);
  const clearUser = useUser((state) => state.clearUser);
  const clearCards = useUser((state) => state.clearCards);

  const handleSubmit = (data: IDeleteUserRequest) => {
    return user?.id
      ? deleteUser(data, user?.id)
          .then(() => {
            clearCards();
            clearMessages();
            clearUser();
          })
          .then(() => {
            addSuccessMessage(
              'Ваш аккаунт удалён! Но мы всегда будем рады вам снова.'
            );
            setTimeout(() => navigate('/', { replace: true }), 5000);
          })
      : Promise.resolve();
  };

  return (
    <UserDeletePopup open={open} onClose={onClose}>
      <DeleteUserForm handleSubmit={handleSubmit} />
    </UserDeletePopup>
  );
};
