import React from 'react';
declare const useFilter: () => {
    filterText: string;
    FilterInput: React.JSX.Element;
    setFilterText: (val: string) => void;
};
export default useFilter;
