import React from 'react';
import { PingWithViewOptions } from './Pings';
declare const PingListItem: {
    ({ isArchive, item, projectPageSlug, }: {
        isArchive: boolean;
        item: PingWithViewOptions;
        projectPageSlug?: string | null | undefined;
    }): React.JSX.Element;
    defaultProps: {
        projectPageSlug: any;
    };
};
export default PingListItem;
