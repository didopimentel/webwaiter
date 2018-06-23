
export const titles = [
  'Table',
  'Order',
  'Items',
  'Item Status',
  'Pick-up Ready',
  'Served',
]

export const tables = [
  {
    number: 4,
    items: [{
      name: 'Meat',
      status: false,
      pickUpReady: false,
      served: false
    },
    {
      name: 'Salad',
      status: true,
      pickUpReady: false,
      served: false
    },
    {
      name: 'Pasta',
      status: true,
      pickUpReady: true,
      served: false
    },
    {
      name: 'Beer',
      status: false,
      pickUpReady: false,
      served: false
    }]
  },
  {
    number: 6,
    items: [{
      name: 'Meat',
      status: true,
      pickUpReady: false,
      served: false
    },
    {
      name: 'Salad',
      status: true,
      pickUpReady: false,
      served: false
    },
    {
      name: 'Pasta',
      status: true,
      pickUpReady: true,
      served: false
    },
    {
      name: 'Beer',
      status: true,
      pickUpReady: false,
      served: false
    }]
  },
  {
    number: 7,
    items: [{
      name: 'Meat',
      status: false,
      pickUpReady: false,
      served: false
    },
    {
      name: 'Salad',
      status: true,
      pickUpReady: false,
      served: false
    },
    {
      name: 'Pasta',
      status: true,
      pickUpReady: true,
      served: false
    },
    {
      name: 'Beer',
      status: false,
      pickUpReady: false,
      served: false
    }]
  }
]

export const messages = [
  {
    direction: 'in',
    station: 'Kitchen',
    content: 'this is a message',
    status: 'unread'
  },
  {
    direction: 'in',
    station: 'Bar',
    content: 'this is a message',
    status: 'read'
  },
  {
    direction: 'out',
    station: 'Desk',
    content: 'this is a message',
    status: 'Sent'
  },
  {
    direction: 'out',
    station: 'Manager',
    content: 'this is a message',
    status: 'Read'
  }
]
