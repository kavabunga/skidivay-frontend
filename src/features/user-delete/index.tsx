import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { CardsContext, MessagesContext, UserContext } from '~/entities';
import { deleteUser } from '~/features';
import { IDeleteUserRequest, IPopupProps } from '~/shared';
import { ApiMessageTypes } from '~/shared/enums';
import { buttonStyle } from './style';
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
    deleteUser(data, user?.id || 0)
      .then(() => {
        setCards && setCards([]);
        setMessages([]);
        setUser && setUser(null);
      })
      .then(() => {
        handleSuccess();
        setTimeout(() => navigate('/', { replace: true }), 5000);
      });
  };

  return (
    <UserDeletePopup open={open} onClose={onClose}>
      <Button variant="text" sx={buttonStyle} onClick={() => handleSubmit}>
        Да, все кончено
      </Button>
    </UserDeletePopup>
  );
};
