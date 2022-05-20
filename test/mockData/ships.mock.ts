const shipsMockData = [
  {
    id: '8aef48f3-d225-42e7-8e2e-bf58dc5a69bc',
    name: 'SHIP',
    updatedAt: '2022-05-19 20:48:39',
    createdAt: '2022-05-19 20:48:39',
    mothership: {
      id: 'f367db4c-c1b9-4880-aee6-afc130a95cf0',
      name: 'MS Carl Vincent',
      updatedAt: '2022-05-19 20:47:08',
      createdAt: '2022-05-19 20:47:08',
    },
    members: [],
  },
  {
    id: 'cdb57728-4c69-417f-9ae3-25efdd0ee451',
    name: 'SHIP 2',
    updatedAt: '2022-05-19 20:51:42',
    createdAt: '2022-05-19 20:51:42',
    mothership: {
      id: 'f367db4c-c1b9-4880-aee6-afc130a95cf0',
      name: 'MS Carl Vincent',
      updatedAt: '2022-05-19 20:47:08',
      createdAt: '2022-05-19 20:47:08',
    },
    members: [
      {
        id: 'bb5eb499-b7e0-4f61-9d66-f3c3a94df2d8',
        name: 'Jack Sparrow',
        updatedAt: '2022-05-19 20:49:40',
        createdAt: '2022-05-19 20:49:40',
      },
    ],
  },
];

export default shipsMockData;
