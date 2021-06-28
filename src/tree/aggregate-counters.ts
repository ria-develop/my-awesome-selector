export type RowData = Record<string, string | number>
export type GroupBy = {
  field: string
}
type Child = (ParentRow | ChildRow);
type Children = Child[];

interface DataRow {
  data: RowData;
}

interface ParentRow {
  children: Children;

  addRow<T>(row: GroupRow | LeafRow<T>): void
}

interface ChildRow {
  parent: GroupRow | RootRow;
}

interface Grouping {
  grouping: GroupBy;
}

interface RootRow extends ParentRow, DataRow, Grouping {
}

interface GroupRow extends ParentRow, ChildRow, DataRow, Grouping {
  updateParent(grouping: GroupBy): void;
}

interface LeafRow<T> extends ChildRow {
  data: RowData & T
}

abstract class AbstractGroupingRow implements ParentRow {
  children: Children = [];
  data: RowData;
  grouping: GroupBy;

  protected constructor(grouping: GroupBy, data: RowData) {
    this.grouping = grouping;
    this.data = data;
    this.getNumChildren = this.getNumChildren.bind(this);
  }

  private getNumChildren(): number {
    return this.children.length;
  }

  addRow<T>(row: GroupRow | LeafRow<T>): void {
    this.children.push(row);
    Object.defineProperty(this.data, this.grouping.field, {
      enumerable: true,
      get: this.getNumChildren
    });
  }
}

class RootRowImpl extends AbstractGroupingRow implements RootRow {
  constructor(grouping: GroupBy) {
    super(grouping, {});
  }
}

class GroupRowImpl extends AbstractGroupingRow implements GroupRow {
  parent!: GroupRow | RootRow;

  constructor(grouping: GroupBy, data: RowData) {
    super(grouping, data);
  }

  updateParent(grouping: GroupBy): void {
    const {parent} = this;
    if (!parent.data[grouping.field]) {
      parent.data[grouping.field] = this.data[grouping.field];
    } else if (typeof parent.data[grouping.field]==='number') {
      (parent.data[grouping.field] as number)++;
    }
    if ('updateParent' in parent) {
      parent.updateParent(grouping);
    }
  }

  override addRow<T>(row: GroupRow | LeafRow<T>): void {
    super.addRow(row);
    const {grouping} = this;
    this.updateParent(grouping);
  }
}

class LeafRowImpl<T> implements LeafRow<T> {
  parent!: GroupRow | RootRow;
  data: RowData & T;

  constructor(data: RowData & T) {
    this.data = data;
  }
}

export function createRow<T>(parent: ParentRow, data: RowData & T, grouping: GroupBy): GroupRow;
export function createRow<T>(parent: ParentRow, data: RowData & T): LeafRow<T>;
export function createRow(grouping: GroupBy): RootRow;
export function createRow<T>(groupOrParent: GroupBy | ParentRow, data?: RowData & T, grouping?: GroupBy): LeafRow<T> | ParentRow | RootRow {
  if ('field' in groupOrParent) {
    return new RootRowImpl(groupOrParent);
  }
  if (data) {
    const row: GroupRow | LeafRow<T> = grouping ? new GroupRowImpl(grouping, {[grouping.field]: data[grouping.field]}):new LeafRowImpl(data);
    Object.defineProperty(row, 'parent', {
      configurable: true,
      value: groupOrParent,
      enumerable: false
    });
    groupOrParent.addRow<T>(row);
    return row;
  }
  throw new Error('unable to create a row');
}
