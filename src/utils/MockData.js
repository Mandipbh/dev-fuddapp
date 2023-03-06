const foodCategory = [
  {
    id: 0,
    name: 'Burger',
    image:
      'https://img.freepik.com/free-photo/delicious-cheeseburger_1232-503.jpg?w=1380&t=st=1667988098~exp=1667988698~hmac=40f7c1a44866d10791dbb757bcc54782df70a771d80d710e6effc7732cd6523d',
  },
  {
    id: 1,
    name: 'Pizza',
    image:
      'https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?w=740&t=st=1667988216~exp=1667988816~hmac=1689bfba22c199c6409a9f9e4a239fdede4a12254118313358bc30c1d0ad8ec1',
  },
  {
    id: 2,
    name: 'Fish',
    image:
      'https://img.freepik.com/free-photo/overhead-view-fried-fishes-lemon-slices-brown-plate-spices-tomatoes-oil-bottle-mix-colors-table-with-free-space_179666-18185.jpg?w=1380&t=st=1667988251~exp=1667988851~hmac=58b0b9ad4e06941e78ec87e4948f8c8e037c4f3f8bbde07e4fec0611a95719a8',
  },
  {
    id: 3,
    name: 'Patisserie',
    image:
      'https://img.freepik.com/premium-photo/tasty-italian-pizza-with-tomato-sauce-parmesan_1220-4325.jpg?w=1380',
  },
  {
    id: 4,
    name: 'Sushi',
    image:
      'https://img.freepik.com/free-photo/side-view-sushi-set-with-soy-sauce-chopsticks-wooden-serving-board_176474-3234.jpg?w=1380&t=st=1667988306~exp=1667988906~hmac=cb3a2b7c7797ceabbe7f7ddfe40dc712f1e8d1b72a9e86bb2c9315d027ecde1a',
  },
  {
    id: 5,
    name: 'Italian',
    image:
      'https://img.freepik.com/free-photo/side-view-spaghetti-with-greens-ricotta-cheese-round-white-plate_176474-3223.jpg?w=740&t=st=1667988327~exp=1667988927~hmac=80396644053f2d681295d9b937d05b43dae4d41b5c5ab805ca1a0f7db5528952',
  },
];

const popularRestaurants = [
  {
    id: 0,
    name: 'Gusto Bistro',
    location: 'York, Toronto',
  },
  {
    id: 1,
    name: 'Fury Burger',
    location: 'York, Toronto',
  },
  {
    id: 2,
    name: 'Pizza king',
    location: 'York, Toronto',
  },
  {
    id: 3,
    name: 'Burger Bistro',
    location: 'York, Toronto',
  },
];

const RestaurantsData = [
  {
    id: 0,
    name: 'Zancos Steak House',
    location: '',
  },
  {
    id: 1,
    name: 'Zancos Steak House',
    location: '',
  },
  {
    id: 2,
    name: 'Zancos Steak House',
    location: '',
  },
];

const foodData = [
  {id: 0, title: 'Farmacie'},
  {id: 1, title: 'Pet'},
  {id: 2, title: 'Supermercati'},
  {id: 3, title: 'Bambini'},
  {id: 4, title: 'Farmacie'},
  {id: 5, title: 'Pet'},
];

const RestoInfo = [
  {id: 0, title: 'Lunedi', time: '12:00 - 23:00'},
  {id: 1, title: 'Lunedi', time: '12:00 - 23:00'},
  {id: 2, title: 'Lunedi', time: '12:00 - 23:00'},
  {id: 3, title: 'Lunedi', time: '12:00 - 23:00'},
  {id: 4, title: 'Lunedi', time: '12:00 - 23:00'},
  {id: 5, title: 'Lunedi', time: '12:00 - 23:00'},
  {id: 6, title: 'Lunedi', time: '12:00 - 23:00'},
];

const foodDetailsData = [
  {
    title: 'Antipasti',
    items: [
      {
        id: 0,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
      {
        id: 1,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
      {
        id: 2,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
    ],
  },
  {
    title: 'Steaks',
    items: [
      {
        id: 0,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
      {
        id: 1,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
      {
        id: 2,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
    ],
  },
  {
    title: 'Burger',
    items: [
      {
        id: 0,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
      {
        id: 1,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
    ],
  },
  {
    title: 'Fantasy Salad',
    items: [
      {
        id: 0,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
      {
        id: 1,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
    ],
  },
  {
    title: 'Works',
    items: [
      {
        id: 0,
        title: 'BBQ chicken fillets',
        price: '€ 15.00',
      },
    ],
  },
];

const profileData = [
  {
    id: 0,
    title: 'I miei Ordini',
  },
  {
    id: 1,
    title: 'Il mio account',
  },
  {
    id: 2,
    title: 'I miei indirizzi',
  },
  {
    id: 3,
    title: 'Contatti',
  },
  {
    id: 4,
    title: 'Esci',
  },
];

const dummyAddress = [
  {
    id: 0,
    name: 'David Barba',
    address: 'Via dalle palle, 88, 90146 Palermo PA, Italia',
    email: 'johndoe@mail.com',
    phone: '+1 800-321-4321',
  },
  {
    id: 0,
    name: 'David Barba',
    address: 'Via dalle palle, 88, 90146 Palermo PA, Italia',
    email: 'johndoe@mail.com',
    phone: '+1 800-321-4321',
  },
];

const orderData = [
  {
    id: 1,
    name: 'Zancos',
    price: '€ 24.00',
    date: '20/07/2020',
    orderdetails: '2x Pizza Mix, 1x Cola',
    totalAmount: '$ 24.00',
  },
  {
    id: 2,
    name: 'Fury Burger',
    price: '€ 26.00',
    date: '20/07/2020',
    orderdetails: '2x Pizza Mix, 1x Cola',
    totalAmount: '$ 24.00',
  },
  {
    id: 2,
    name: 'Gusto Bistro',
    date: '20/07/2020',
    price: '€ 30.00',
    orderdetails: '2x Pizza Mix, 1x Cola',
    totalAmount: '$ 24.00',
  },
];

const cartData = [
  {
    id: 1,
    title: 'Aggiungi Ingredienti',
    isCheck: false,
    items: [
      {
        id: 1,
        title: 'Bacon Croccante',
        price: '+ €1.00',
      },
      {
        id: 2,
        title: 'Bacon Croccante',
        price: '+ €1.00',
      },
      {
        id: 3,
        title: 'Bacon Croccante',
        price: '+ €1.00',
      },
    ],
  },
  {
    id: 2,
    title: 'Rimuovi Ingredienti',
    isCheck: true,
    items: [
      {
        name: 'Pomodoro',
        check: true,
      },
      {
        name: 'Pomodoro',
        check: true,
      },
    ],
  },
];

const optionsData = [
  {
    id: 1,
    title: 'Contanti alla consegna',
  },
  {
    id: 3,
    title: 'POS alla consegna',
  },
  {
    id: 2,
    title: 'Carta di credito',
  },
];


export {
  foodCategory,
  popularRestaurants,
  RestaurantsData,
  foodData,
  foodDetailsData,
  profileData,
  dummyAddress,
  orderData,
  cartData,
  RestoInfo,
  optionsData,
};
