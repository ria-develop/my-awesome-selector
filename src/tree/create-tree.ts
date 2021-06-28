export enum NodeType { PARENT, LEAF}

type BaseObject = Record<string | number, string | number>;

export type BaseNode<T extends BaseObject, G extends keyof T> = {
  key?: string | number,
  data?: T | BaseObject;
  parent?: ParentNode<T, G>;
}

export type LeafNode<T extends BaseObject, G extends keyof T> = BaseNode<T, G> & {
  type: NodeType.LEAF
}

export type ParentNode<T extends BaseObject, G extends keyof T> = BaseNode<T, G> & {
  type: NodeType.PARENT;
  children: Node<T, G>[];
}

export type Node<T extends BaseObject, G extends keyof T> = ParentNode<T, G> | LeafNode<T, G>

export type Id = {
  [index in (string | number)]: Id;
};

export type ReduceListToTreeProps<T extends BaseObject, G extends keyof T> = {
  list: T[]; root: Id;
  grouping: G[];
  nodeById: Map<Id, Node<T, G>>;
  rootNode: Node<T, G>
}

const createParentNode = <T extends BaseObject, G extends keyof T>(grouping: G[], key: string | number): ParentNode<T, G> => {
  return {
    children: [],
    data: grouping.reduce((newNode, property) => {
      return {...newNode, [property]: 0};
    }, {}),
    key,
    type: NodeType.PARENT
  };
};

const createLeafNode = <T extends BaseObject, G extends keyof T>(data: T): LeafNode<T, G> => {
  return {
    data,
    type: NodeType.LEAF
  };
};

const getId = (parentId: Id, key: string | number): Id => {
  let id: Id = parentId[key];
  if (!id) {
    id = {};
    parentId[key] = id;
  }
  return id;
};

function createNode<T extends BaseObject, G extends keyof T>(isLeafDepth: boolean, nextItem: T, grouping: G[], name: T[G]): Node<T, G> {
  return isLeafDepth ? createLeafNode(nextItem):createParentNode(grouping, name);
}

function handleAddToParent<T extends BaseObject, G extends keyof T>(node: Node<T, G>, depth = 0): void {
  const {parent} = node;
  if (parent && parent.data) {
    (Object.keys(parent.data) as G[]).map((property: G, index) => {
      if (parent.data) {
        if (index >= depth) {
          if (node.data) {
            parent.data = {...parent.data, [property]: node.data[property]};
          }
        } else {
          parent.data = {...parent.data, [property]: parseInt(parent.data[property] as string) + 1};
        }
      }
    });
    if (parent.parent) {
      handleAddToParent(parent, depth++);
    }
  }
}

function addNodeToParent<T extends BaseObject, G extends keyof T>(node: Node<T, G>, parentNode: ParentNode<T, G>): void {
  Object.defineProperty(node, 'parent', {
    value: parentNode,
    enumerable: false,
    configurable: true
  });
  if (!isLeaf(parentNode)) {
    parentNode.children.push(node);
    if (isLeaf(node)) {
      handleAddToParent(node);
    }
  }
}

function reduceListToTree<T extends BaseObject, G extends keyof T>({
  grouping,
  list,
  root,
  rootNode,
  nodeById
}: ReduceListToTreeProps<T, G>): Node<T, G> {
  return list.reduce((accumulator: Node<T, G>, dataItem: T) => {
    let parentId: Id = root;
    let parentNode: Node<T, G> = accumulator;

    grouping.forEach((group: G, index: number) => {
      const name: T[G] = dataItem[group];
      const id = getId(parentId, name);
      let node = nodeById.get(id);
      if (!node) {
        const isLeafDepth = index===grouping.length - 1;
        node = createNode(isLeafDepth, dataItem, grouping, name);
        nodeById.set(id, node);
        if (node && !isLeaf(parentNode)) {
          addNodeToParent(node, parentNode);
        }
      }
      parentId = id;
      parentNode = node;
    });
    return accumulator;
  }, rootNode);
}

export function createTree<T extends BaseObject, G extends keyof T>(list: T[], grouping: G[]): Node<T, G> {
  const root: Id = {};
  const nodeById: Map<Id, Node<T, G>> = new Map<Id, Node<T, G>>();
  const rootNode: ParentNode<T, G> = createParentNode(grouping, 'ROOT'); //ROOT node;
  return reduceListToTree({list, root, grouping, nodeById, rootNode});
}

export const isLeaf = <T extends BaseObject, G extends keyof T>(node?: Node<T, G>): node is LeafNode<T, G> => !!node && node.type===NodeType.LEAF;
