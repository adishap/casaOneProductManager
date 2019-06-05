var product = [
  {
    id: 'p1',
    name: 'Chair',
    price: 300,
  },
  {
    id: 'p2',
    name: 'Table',
    price: 700,
  },
  {
    id: 'p3',
    name: 'Dinning Chair',
    price: 100,
  },
  {
    id: 'p4',
    name: 'Set top box',
    price: 400,
  }
];

var order = [
  {
    id: 'o1',
    products: [
      {
        pId: 'p1',
        quantity: 4,
        notes: '',
      },
      {
        pId: 'p2',
        quantity: 1,
        notes: '',
      },
    ],
    orderDate: '',
    deliveryDate: '',
    billingAddress: {
        firstName: 'Adam',
        lastName: 'Greens',
        addressLine1: '101, Main Str',
        addressLine2: 'Brown Bakers',
        city: 'Albani',
        state: 'New York',
        country: 'US',
        zipcode: '456783',
    },
    shippingAddress: {
        firstName: 'Adam',
        lastName: 'Greens',
        addressLine1: '101, Main Str',
        addressLine2: 'Brown Bakers',
        city: 'Albani',
        state: 'New York',
        country: 'US',
        zipcode: '456783',
    },
  },
  {
    id: 'o2',
    products: [
      {
        pId: 'p3',
        quantity: 5,
        notes: 'Without stand',
      },
      {
        pId: 'p2',
        quantity: 10,
        notes: '',
      },
    ],
    orderDate: '',
    deliveryDate: '',
    billingAddress: {
        firstName: 'Adam',
        lastName: 'Greens',
        addressLine1: '101, Main Str',
        addressLine2: 'Brown Bakers',
        city: 'Albani',
        state: 'New York',
        country: 'US',
        zipcode: '456783',
    },
    shippingAddress: {
        firstName: 'Adam',
        lastName: 'Greens',
        addressLine1: '101, Main Str',
        addressLine2: 'Brown Bakers',
        city: 'Albani',
        state: 'New York',
        country: 'US',
        zipcode: '456783',
    },
  }
];
