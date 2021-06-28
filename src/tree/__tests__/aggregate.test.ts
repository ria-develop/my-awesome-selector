import {createRow, GroupBy, RowData} from '../aggregate-counters';

type RawData = RowData & {
  category?: string | number;
  group?: string | number;
  item?: string | number;
  total: number
}

describe('given I have structure', () => {
  test('I should get correct numbers', () => {
    const ByCategory: GroupBy = {
      field: 'category'
    };
    const ByGroup: GroupBy = {
      field: 'group'
    };
    const ByItem: GroupBy = {
      field: 'item'
    };

    // const Grouping = [ByCategory, ByGroup];
    const data1: RawData = {
      category: 'Category 1',
      group: 'Group 1',
      item: 'Item 1',
      total: 1
    };
    const data2: RawData = {
      category: 'Category 1',
      group: 'Group 2',
      item: 'Item 1',
      total: 1
    };

    const root = createRow(ByCategory);
    const category1 = createRow<RawData>(root, data1, ByGroup);
    const group1 = createRow<RawData>(category1, data1, ByItem);
    const group2 = createRow<RawData>(category1, data2, ByItem);
    const group3 = createRow<RawData>(category1, data2, ByItem);
    const item1 = createRow<RawData>(group1, data1);
    const item2 = createRow<RawData>(group2, data2);

    expect(item1.data).toEqual({category: 'Category 1', group: 'Group 1', item: 'Item 1', total: 1});
    expect(item2.data).toEqual({category: 'Category 1', group: 'Group 2', item: 'Item 1', total: 1});
    expect(group1.data).toEqual({item: 1});
    expect(group2.data).toEqual({item: 1});
    expect(group3.data).toEqual({item: 'Item 1'});
    expect(category1.data).toEqual({group: 3, item: 2});
    expect(root.data).toEqual({category: 1, group: 3, item: 2});
  });
});
//
