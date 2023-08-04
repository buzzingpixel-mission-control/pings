import React, { Dispatch, SetStateAction } from 'react';
import { Ping } from './Pings';
declare const PingListItemEditor: ({ item, setEditorIsOpen, }: {
    item: Ping;
    setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default PingListItemEditor;
