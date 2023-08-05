import React from 'react';
import { PingWithViewOptions } from '../Pings';
declare const PageHeader: {
    ({ data, fromProjectPageSlug, }: {
        data: PingWithViewOptions;
        fromProjectPageSlug?: string | undefined | null;
    }): React.JSX.Element;
    defaultProps: {
        fromProjectPageSlug: any;
    };
};
export default PageHeader;
