import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardsContext, MessagesContext, UserContext } from '~/app';
import { DeleteUserForm, deleteUser } from '~/features';
import { IDeleteUserRequest, IPopupProps } from '~/shared';
import { ApiMessageTypes } from '~/shared/enums';
import { UserDeletePopup } from '~/entities';

export const DeleteUser: FC<IPopupProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { setMessages } = useContext(MessagesContext);
  const { user, setUser } = useContext(UserContext);
  const { setCards } = useContext(CardsContext);

  const handleSuccess = () => {
    setMessages((messages) => [
      {
        message: 'Ваш аккаунт удалён! Но мы всегда будем рады вам снова.',
        type: ApiMessageTypes.success,
      },
      ...messages,
    ]);
  };

  const handleSubmit = (data: IDeleteUserRequest) => {
    return user?.id
      ? deleteUser(data, user?.id)
          .then(() => {
            setCards && setCards([]);
            setMessages([]);
            setUser && setUser(null);
          })
          .then(() => {
            handleSuccess();
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
