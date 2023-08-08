import React from 'react';
import { PingWithViewOptions } from './Pings';
declare const PingListItem: {
    ({ isArchive, item, projectPageSlug, selectedItemsManager, }: {
        isArchive: boolean;
        item: PingWithViewOptions;
        projectPageSlug?: string | null | undefined;
        selectedItemsManager?: {
            selectedItems?: Array<string> | null | undefined;
            addSelectedItem?: (id: string) => void;
            removeSelectedItem?: (id: string) => void;
        };
    }): React.JSX.Element;
    defaultProps: {
        projectPageSlug: any;
        selectedItemsManager: any;
    };
};
export default PingListItem;
