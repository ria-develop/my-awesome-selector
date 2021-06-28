export default {
  children: [
    {
      data: {
        category: 0,
        group: 0,
        item: 0
      },
      key: 'Cat 1',
      type: 0,
      children: [
        {
          data: {
            category: 0,
            group: 0,
            item: 0
          },
          key: 'Group 1',
          type: 0,
          children: [
            {
              data: {
                category: 'Cat 1',
                group: 'Group 1',
                item: 'Item 1',
                value: 100
              },
              type: 1
            },
            {
              data: {
                category: 'Cat 1',
                group: 'Group 1',
                item: 'Item 2',
                value: 100
              },
              type: 1
            }
          ]
        },
        {
          children: [
            {
              data: {
                category: 'Cat 1',
                group: 'Group 2',
                item: 'Item 1',
                value: 100
              },
              type: 1
            },
            {
              data: {
                category: 'Cat 1',
                group: 'Group 2',
                item: 'Item 2',
                value: 100
              },
              type: 1
            }
          ],
          data: {
            category: 0,
            group: 0,
            item: 0
          },
          key: 'Group 2',
          type: 0
        }
      ]
    },
    {
      data: {
        category: 0,
        group: 0,
        item: 0
      },
      key: 'Cat 2',
      type: 0,
      children: [
        {
          children: [
            {
              data: {
                category: 'Cat 2',
                group: 'Group 1',
                item: 'Item 1',
                value: 100
              },
              type: 1
            },
            {
              data: {
                category: 'Cat 2',
                group: 'Group 1',
                item: 'Item 2',
                value: 100
              },
              type: 1
            }
          ],
          data: {
            category: 0,
            group: 0,
            item: 0
          },
          key: 'Group 1',
          type: 0
        },
        {
          children: [
            {
              data: {
                category: 'Cat 2',
                group: 'Group 2',
                item: 'Item 1',
                value: 100
              },
              type: 1
            },
            {
              data: {
                category: 'Cat 2',
                group: 'Group 2',
                item: 'Item 2',
                value: 100
              },
              type: 1
            }
          ],
          data: {
            category: 0,
            group: 0,
            item: 0
          },
          key: 'Group 2',
          type: 0
        }
      ]
    }
  ]
};
