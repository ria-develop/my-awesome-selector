import {setupLookupContext} from './context/lookup-context-setup';

export type Selection = {
  clientName: string,
  clientId: string
}

const noop = () => console.log('noop');

const {LookupContext, LookupContextProvider, useLookupContext} = setupLookupContext<Selection>({
  handleChange: noop,
  handleDropdownVisibleChange: noop,
  handleCommitCursorMovement: noop,
  handleCursorMoveTo: noop,
  handleSearch: noop,
  handleToggleSearch: noop,
  handleError: noop,
  handleKeyPress: noop,
  handleSetColumns: noop,
  handleSetDataSource: noop,
  error: undefined,
  cursor: undefined,
  lookupValue: '',
  open: false,
  placeholder: '',
  searchValue: '',
  toggleSearchButtonLabel: '',
  toggleSearchVisible: false,
  columns: [],
  rows: []
});

export {LookupContext, LookupContextProvider, useLookupContext};
