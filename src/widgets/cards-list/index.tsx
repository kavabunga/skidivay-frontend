import Grid from '@mui/material/Unstable_Grid2';
import { Card } from '~/entities';
import { AddCardButton } from '~/features';

export const CardsList = ({
  items = cards,
  onClickCard,
  onClickLike,
  onClickAddCard,
}) => {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 12, sm: 12, md: 12 }}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid
        key={'add-card-button'}
        justifyContent="center"
        alignItems="center"
        xs={6}
        sm={4}
        md={3}
        sx={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AddCardButton
          onClick={onClickAddCard}
          text="Добавить новую&nbsp;карту"
        />
      </Grid>

      {items.map((item) => {
        return (
          <Grid
            key={item._id}
            justifyContent="center"
            alignItems="center"
            xs={6}
            sm={4}
            md={3}
            sx={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Card
              card={item}
              onClickCard={onClickCard}
              onClickLike={onClickLike}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

const cards: {
  _id: string;
  name: string;
  number: string;
  url: string;
  category: string;
  isLiked: boolean;
}[] = [
  {
    _id: ' h54k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/h42qWNnk/cloth-shoes-01.jpg',
    category: 'cloth-shoes',
    isLiked: false,
  },
  {
    _id: ' h54kfg5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/GhTg7fmJ/office-01.jpg',
    category: 'office',
    isLiked: true,
  },
  {
    _id: ' h5sd5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/1XkB1930/entertainments-01.jpg',
    category: 'entertainments',
    isLiked: false,
  },
  {
    _id: ' h54shk5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/Kzdpx79g/appliances-01.jpg',
    category: 'appliances',
    isLiked: false,
  },
  {
    _id: ' h54974k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/PqBZ3S39/pharmacies-01.jpg',
    category: 'pharmacies',
    isLiked: false,
  },
  {
    _id: ' 6774k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/8PGw4zxD/household-products-01.jpg',
    category: 'household-products',
    isLiked: false,
  },
  {
    _id: ' hwwek5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/fbVvytS7/cloth-shoes-05.png',
    category: 'cloth-shoes',
    isLiked: false,
  },
  {
    _id: ' h5dd4k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/50wLQw4z/construction-products-02.png',
    category: 'construction-products',
    isLiked: false,
  },
  {
    _id: ' h5458k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/L8cJkn03/sport-01.jpg',
    category: 'sport',
    isLiked: true,
  },
  {
    _id: ' h54sdomvk5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/kgJm09RP/cloth-shoes-03.png',
    category: 'cloth-shoes',
    isLiked: false,
  },
  {
    _id: ' h549v4k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/jSdp8XBs/construction-products-01.png',
    category: 'construction-products',
    isLiked: true,
  },
  {
    _id: ' h5458k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/d0ygDm3v/sport-02.jpg',
    category: 'sport',
    isLiked: true,
  },
  {
    _id: ' h5f3494k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/XJzSFysV/food-02.jpg',
    category: 'food',
    isLiked: false,
  },
  {
    _id: ' hht54k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/L4GhFqmK/entertainments-02.png',
    category: 'entertainments',
    isLiked: false,
  },
  {
    _id: ' h604554k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/8CyPKcZY/appliances-03.png',
    category: 'appliances',
    isLiked: false,
  },
  {
    _id: ' h5407k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/023jxzx1/cosmetics-perfumery-01.jpg',
    category: 'cosmetics-perfumery',
    isLiked: false,
  },
  {
    _id: ' h52854k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/mgYsqkgw/optics-01.jpg',
    category: 'optics',
    isLiked: true,
  },
  {
    _id: ' h5f3494k5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/d3L2tnQj/food-01.png',
    category: 'food',
    isLiked: false,
  },
  {
    _id: ' h54dmik5j',
    name: ' Лавка',
    number: '123',
    url: 'https://i.postimg.cc/FRMv8L3T/household-products-02.png',
    category: 'household-products',
    isLiked: true,
  },
];
