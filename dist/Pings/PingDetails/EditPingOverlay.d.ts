import React, { Dispatch, SetStateAction } from 'react';
import { Ping } from '../Pings';
declare const EditPingOverlay: ({ item, setIsOpen, }: {
    item: Ping;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default EditPingOverlay;
