import data from '../__mocks__/flat-data';
import {  createTree, isLeaf} from '../create-tree';

const Groups = ['category', 'group', 'item'] as const;
type Grouping = typeof Groups[number];
type Source = Record<Grouping, string> & {
  value: number
}

describe('Given I have a data structure', function () {
  test('Given I have flat data with 8 items', () => {
    expect(data).toBeDefined();
    expect(data).toHaveLength(8);
  });
  test('I should see the tree structure', () => {

    const myNodes = createTree<Source, Grouping>(data, [...Groups]);

    expect(myNodes).toBeDefined();
    expect(isLeaf(myNodes)).toBeFalsy();
    if (!isLeaf(myNodes)) {
      expect(myNodes.children).toHaveLength(2);
      expect(myNodes.children).toEqual([
        {
          'children': [
            {
              'children': [
                {
                  'data': {
                    'category': 'Cat 1',
                    'group': 'Group 1',
                    'item': 'Item 1',
                    'value': 100
                  },
                  'type': 1
                },
                {
                  'data': {
                    'category': 'Cat 1',
                    'group': 'Group 1',
                    'item': 'Item 2',
                    'value': 100
                  },
                  'type': 1
                }
              ],
              'data': {
                'category': 'Cat 1',
                'group': 'Group 1',
                'item': 2
              },
              'key': 'Group 1',
              'type': 0
            },
            {
              'children': [
                {
                  'data': {
                    'category': 'Cat 1',
                    'group': 'Group 2',
                    'item': 'Item 1',
                    'value': 100
                  },
                  'type': 1
                },
                {
                  'data': {
                    'category': 'Cat 1',
                    'group': 'Group 2',
                    'item': 'Item 2',
                    'value': 100
                  },
                  'type': 1
                }
              ],
              'data': {
                'category': 'Cat 1',
                'group': 'Group 2',
                'item': 2
              },
              'key': 'Group 2',
              'type': 0
            }
          ],
          'data': {
            'category': 'Cat 1',
            'group': 2,
            'item': 4
          },
          'key': 'Cat 1',
          'type': 0
        },
        {
          'children': [
            {
              'children': [
                {
                  'data': {
                    'category': 'Cat 2',
                    'group': 'Group 1',
                    'item': 'Item 1',
                    'value': 100
                  },
                  'type': 1
                },
                {
                  'data': {
                    'category': 'Cat 2',
                    'group': 'Group 1',
                    'item': 'Item 2',
                    'value': 100
                  },
                  'type': 1
                }
              ],
              'data': {
                'category': 'Cat 2',
                'group': 'Group 1',
                'item': 0
              },
              'key': 'Group 1',
              'type': 0
            },
            {
              'children': [
                {
                  'data': {
                    'category': 'Cat 2',
                    'group': 'Group 2',
                    'item': 'Item 1',
                    'value': 100
                  },
                  'type': 1
                },
                {
                  'data': {
                    'category': 'Cat 2',
                    'group': 'Group 2',
                    'item': 'Item 2',
                    'value': 100
                  },
                  'type': 1
                }
              ],
              'data': {
                'category': 'Cat 2',
                'group': 'Group 2',
                'item': 2
              },
              'key': 'Group 2',
              'type': 0
            }
          ],
          'data': {
            'category': 'Cat 2',
            'group': 2,
            'item': 4
          },
          'key': 'Cat 2',
          'type': 0
        }
      ]);
    }
  });
});
