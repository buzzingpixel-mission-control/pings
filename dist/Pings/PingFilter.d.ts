import React, { Dispatch, SetStateAction } from 'react';
declare const PingFilter: ({ filterText, setFilterText, }: {
    filterText: string | null;
    setFilterText: Dispatch<SetStateAction<string>>;
}) => React.JSX.Element;
export default PingFilter;
