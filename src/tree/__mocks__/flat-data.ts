export type DataSource = {
  category: string
  group: string;
  item: string;
  value: number;
};
const data: DataSource[] = [
  {
    category: 'Cat 1',
    group: 'Group 1',
    item: 'Item 1',
    value: 100
  },
  {
    category: 'Cat 1',
    group: 'Group 1',
    item: 'Item 2',
    value: 100
  },
  {
    category: 'Cat 1',
    group: 'Group 2',
    item: 'Item 1',
    value: 100
  },
  {
    category: 'Cat 1',
    group: 'Group 2',
    item: 'Item 2',
    value: 100
  },
  {
    category: 'Cat 2',
    group: 'Group 1',
    item: 'Item 1',
    value: 100
  },
  {
    category: 'Cat 2',
    group: 'Group 1',
    item: 'Item 2',
    value: 100
  },
  {
    category: 'Cat 2',
    group: 'Group 2',
    item: 'Item 1',
    value: 100
  },
  {
    category: 'Cat 2',
    group: 'Group 2',
    item: 'Item 2',
    value: 100
  }
];
export default data;
